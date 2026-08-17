/**
 * Modo de lançamento controlado do SinalizaPet.
 *
 * Este é o ÚNICO lugar a alterar para liberar (ou fechar) o cadastro público.
 *
 *   PUBLIC_SIGNUP_ENABLED = false → cadastro fechado (botão "Criar conta" oculto,
 *                                   rota /cadastro bloqueada, criação de contas
 *                                   recusada também no servidor).
 *   PUBLIC_SIGNUP_ENABLED = true  → cadastro liberado (botão volta a aparecer,
 *                                   rota disponível, novas contas são criadas).
 *
 * "Entrar" e o acesso de administradores funcionam nos dois casos.
 */
export const PUBLIC_SIGNUP_ENABLED = false;

/** Username reservado da dona do projeto — recebe papel de administradora. */
export const OWNER_USERNAME = "anahelouise";

/** Username reservado para a conta oficial do sistema. */
export const SYSTEM_ACCOUNT_USERNAME = "SinalizaPet";

/** Rota para onde o visitante vai quando tenta acessar algo interno. */
export const SIGN_IN_ROUTE = "/login" as const;