import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DemoNotice, Field } from "@/components/FormKit";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — SinalizaPet" },
      { name: "description", content: "Acesse sua conta para acompanhar ocorrências e avistamentos." },
      { property: "og:title", content: "Entrar — SinalizaPet" },
      { property: "og:description", content: "Acesse o SinalizaPet e acompanhe suas ocorrências." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-accent/40 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex justify-center">
          <img src={BRAND.logoUrl} alt={`${BRAND.name} — ${BRAND.slogan}`} className="h-9 w-auto mix-blend-multiply" />
        </Link>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
          <h1 className="text-2xl font-bold">Entrar</h1>
          <p className="mt-1 text-sm text-muted-foreground">{BRAND.slogan}</p>
          <div className="mt-6 grid gap-4">
            <Field label="E-mail" htmlFor="email"><Input id="email" type="email" autoComplete="email" /></Field>
            <Field label="Senha" htmlFor="senha"><Input id="senha" type="password" autoComplete="current-password" /></Field>
            <DemoNotice>
              A autenticação ainda não está conectada. Use o botão abaixo para navegar pela versão de
              demonstração.
            </DemoNotice>
            <Button asChild size="lg"><Link to="/dashboard">Entrar na demonstração</Link></Button>
            <p className="text-center text-sm text-muted-foreground">
              Não tem conta? <Link to="/cadastro" className="font-medium underline">Criar conta</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
