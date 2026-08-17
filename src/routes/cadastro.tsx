import { useState } from "react";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Field } from "@/components/FormKit";
import { UsernameField } from "@/components/UsernameField";
import { AuthLayout } from "@/routes/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoTakenUsernames } from "@/data/demo";
import { supabase } from "@/integrations/supabase/client";
import { PUBLIC_SIGNUP_ENABLED, OWNER_USERNAME } from "@/config/launch";
import { registerAccount } from "@/lib/auth.functions";

export const Route = createFileRoute("/cadastro")({
  // Cadastro fechado: a rota é bloqueada mesmo se alguém digitar a URL.
  // O servidor recusa a criação de contas de forma independente (ver auth.functions.ts).
  beforeLoad: () => {
    if (!PUBLIC_SIGNUP_ENABLED) throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Criar conta — SinalizaPet" },
      {
        name: "description",
        content:
          "Crie sua conta no SinalizaPet para abrir ocorrências, sinalizar avistamentos e receber alertas do seu bairro.",
      },
      { property: "og:title", content: "Criar conta — SinalizaPet" },
      { property: "og:description", content: "Entre na rede comunitária de busca por animais perdidos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!usernameValid) {
      toast.error("Escolha um username válido", {
        description: "Ele precisa ser único e não pode ser reservado pelo sistema.",
      });
      return;
    }
    setLoading(true);
    try {
      const result = await registerAccount({
        data: { name, username, email, city, password },
      });
      if (!result.ok) {
        toast.error("Cadastro indisponível", { description: result.message });
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.success("Conta criada", { description: "Faça login para continuar." });
        void navigate({ to: "/login" });
        return;
      }
      toast.success("Conta criada", {
        description: `Bem-vinda ao SinalizaPet, @${username}.`,
      });
      void navigate({ to: username === OWNER_USERNAME ? "/admin" : "/dashboard" });
    } catch {
      toast.error("Não foi possível criar a conta", { description: "Revise os dados e tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Leva menos de um minuto.">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSignUp();
        }}
      >
        <Field label="Nome" required>
          <Input placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <UsernameField
          taken={demoTakenUsernames}
          onChange={(value, valid) => {
            setUsername(value);
            setUsernameValid(valid);
          }}
        />
        <Field label="E-mail" required>
          <Input
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Cidade" required>
          <Input
            placeholder="Belo Horizonte"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Field>
        <Field label="Senha" required hint="Mínimo de 8 caracteres.">
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button type="submit" size="lg" className="border-2 border-ink" disabled={loading}>
          {loading ? "Criando conta..." : "Criar conta"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="font-semibold text-ink underline">
            Entrar
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}