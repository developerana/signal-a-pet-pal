import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { PUBLIC_SIGNUP_ENABLED, OWNER_USERNAME } from "@/config/launch";
import { usernameSchema } from "@/lib/username";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  username: usernameSchema,
  email: z.string().trim().email("E-mail inválido."),
  city: z.string().trim().min(2, "Informe sua cidade."),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres."),
});

export type RegisterResult = { ok: true } | { ok: false; message: string };

/**
 * Criação de contas — bloqueada no servidor enquanto PUBLIC_SIGNUP_ENABLED for false.
 * O cadastro nativo do backend está desativado, portanto este é o único caminho
 * possível para criar uma conta, e ele respeita a configuração central.
 *
 * Exceção única: a conta da dona do projeto (@anahelouise) pode ser criada uma
 * vez, enquanto ainda não existir nenhum administrador. A senha é escolhida por
 * ela no formulário — nada fica no código.
 */
export const registerAccount = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registerSchema.parse(data))
  .handler(async ({ data }): Promise<RegisterResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const isOwnerBootstrap = data.username === OWNER_USERNAME;
    let ownerBootstrapAllowed = false;

    if (isOwnerBootstrap) {
      const { count } = await supabaseAdmin
        .from("user_roles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");
      ownerBootstrapAllowed = (count ?? 0) === 0;
    }

    if (!PUBLIC_SIGNUP_ENABLED && !ownerBootstrapAllowed) {
      return {
        ok: false,
        message: "O cadastro está temporariamente fechado durante a fase de desenvolvimento.",
      };
    }

    const { data: taken } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("username_normalized", data.username)
      .maybeSingle();
    if (taken) return { ok: false, message: "Este username já está em uso." };

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { username: data.username, name: data.name, city: data.city },
    });

    if (error || !created.user) {
      console.error("registerAccount: createUser failed", error?.message);
      return { ok: false, message: "Não foi possível criar a conta com estes dados." };
    }

    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: created.user.id,
      username: data.username,
      name: data.name,
      city: data.city,
    });
    if (profileError) {
      console.error("registerAccount: profile insert failed", profileError.message);
      await supabaseAdmin.auth.admin.deleteUser(created.user.id);
      return { ok: false, message: "Não foi possível concluir o cadastro. Tente novamente." };
    }

    await supabaseAdmin.from("user_roles").insert({
      user_id: created.user.id,
      role: ownerBootstrapAllowed ? "admin" : "user",
    });

    return { ok: true };
  });

export type AccountSummary = {
  userId: string;
  username: string | null;
  name: string | null;
  city: string | null;
  isAdmin: boolean;
};

/** Perfil + papéis da pessoa autenticada. */
export const getMyAccount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AccountSummary> => {
    const { supabase, userId } = context;

    const [{ data: profile }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("username, name, city").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    return {
      userId,
      username: profile?.username ?? null,
      name: profile?.name ?? null,
      city: profile?.city ?? null,
      isAdmin: (roles ?? []).some((r) => r.role === "admin"),
    };
  });