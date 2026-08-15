import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DemoNotice, Field } from "@/components/FormKit";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — SinalizaPet" },
      { name: "description", content: "Crie sua conta para cadastrar animais, ocorrências e avistamentos." },
      { property: "og:title", content: "Criar conta — SinalizaPet" },
      { property: "og:description", content: "Participe da rede comunitária que ajuda pets a voltarem para casa." },
    ],
  }),
  component: CadastroPage,
});

function CadastroPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-accent/40 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex justify-center">
          <img src={BRAND.logoUrl} alt={`${BRAND.name} — ${BRAND.slogan}`} className="h-9 w-auto" />
        </Link>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
          <h1 className="text-2xl font-bold">Criar conta</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Juntos, podemos ajudar um pet a voltar para casa.
          </p>
          <div className="mt-6 grid gap-4">
            <Field label="Nome" htmlFor="nome"><Input id="nome" autoComplete="name" /></Field>
            <Field label="E-mail" htmlFor="email"><Input id="email" type="email" autoComplete="email" /></Field>
            <Field label="Cidade" htmlFor="cidade" hint="Usamos apenas a cidade e o bairro — nunca o endereço completo.">
              <Input id="cidade" />
            </Field>
            <Field label="Senha" htmlFor="senha"><Input id="senha" type="password" autoComplete="new-password" /></Field>
            <DemoNotice>
              Cadastro, confirmação de e-mail e recuperação de senha serão ativados com a autenticação.
            </DemoNotice>
            <Button asChild size="lg"><Link to="/dashboard">Explorar a demonstração</Link></Button>
            <p className="text-center text-sm text-muted-foreground">
              Já tem conta? <Link to="/login" className="font-medium underline">Entrar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
