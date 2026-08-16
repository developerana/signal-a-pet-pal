import { z } from "zod";

/** Conta oficial do sistema — reservada, não pode ser usada por pessoas. */
export const SYSTEM_USERNAME = "SinalizaPet";

/** Conta da administradora e dona do projeto. */
export const OWNER_USERNAME = "anahelouise";

/**
 * Nomes de usuário reservados (comparação sempre em minúsculas).
 * Inclui a conta do sistema e variações que poderiam confundir a comunidade.
 */
export const RESERVED_USERNAMES = [
  "sinalizapet",
  "sinaliza",
  "sinaliza_pet",
  "sinalizapetoficial",
  "admin",
  "administrador",
  "suporte",
  "equipe",
  "moderacao",
  "sistema",
  "oficial",
] as const;

export const USERNAME_MIN = 3;
export const USERNAME_MAX = 20;

/** Remove o @, espaços e normaliza para minúsculas. */
export function normalizeUsername(value: string) {
  return value.trim().replace(/^@+/, "").toLowerCase();
}

/** Exibição pública: sempre com @. */
export function formatUsername(value: string) {
  return `@${value.replace(/^@+/, "")}`;
}

export const usernameSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/^@+/, "").toLowerCase())
  .refine((v) => v.length >= USERNAME_MIN, {
    message: `O username precisa ter pelo menos ${USERNAME_MIN} caracteres.`,
  })
  .refine((v) => v.length <= USERNAME_MAX, {
    message: `O username pode ter no máximo ${USERNAME_MAX} caracteres.`,
  })
  .refine((v) => /^[a-z0-9._]+$/.test(v), {
    message: "Use apenas letras, números, ponto e underline.",
  })
  .refine((v) => /^[a-z0-9]/.test(v), { message: "Comece com uma letra ou número." })
  .refine((v) => !/[._]$/.test(v), { message: "Não termine com ponto ou underline." })
  .refine((v) => !/[._]{2,}/.test(v), { message: "Evite ponto ou underline repetidos." })
  .refine((v) => !RESERVED_USERNAMES.includes(v as (typeof RESERVED_USERNAMES)[number]), {
    message: "Este username é reservado pelo SinalizaPet.",
  });

export type UsernameCheck =
  | { ok: true; username: string }
  | { ok: false; error: string };

/**
 * Valida formato, reserva e duplicidade.
 * `taken` são os usernames já existentes (em minúsculas).
 */
export function checkUsername(value: string, taken: readonly string[] = []): UsernameCheck {
  const parsed = usernameSchema.safeParse(value);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Username inválido." };
  }
  const username = parsed.data;
  if (taken.map(normalizeUsername).includes(username)) {
    return { ok: false, error: "Este username já está em uso." };
  }
  return { ok: true, username };
}

/** Sugere um username livre a partir do nome da pessoa. */
export function suggestUsername(name: string, taken: readonly string[] = []) {
  const base =
    normalizeUsername(name)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      .slice(0, USERNAME_MAX) || "tutor";
  let candidate = base;
  let i = 1;
  while (checkUsername(candidate, taken).ok === false) {
    candidate = `${base.slice(0, USERNAME_MAX - 2)}${i}`;
    i += 1;
    if (i > 99) break;
  }
  return candidate;
}
