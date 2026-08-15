import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { DemoNote, Field } from "@/components/FormKit";
import { AuthLayout } from "@/routes/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/cadastro")({
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
  return (
    <AuthLayout title="Criar conta" subtitle="Leva menos de um minuto.">
      <div className="grid gap-4">
        <Field label="Nome" required>
          <Input placeholder="Seu nome" />
        </Field>
        <Field label="E-mail" required>
          <Input type="email" placeholder="voce@email.com" />
        </Field>
        <Field label="Cidade" required>
          <Input placeholder="Belo Horizonte" />
        </Field>
        <Field label="Senha" required hint="Mínimo de 8 caracteres.">
          <Input type="password" placeholder="••••••••" />
        </Field>
        <DemoNote />
        <Button
          size="lg"
          className="border-2 border-ink"
          onClick={() => {
            toast.success("Conta criada", { description: "Bem-vinda ao SinalizaPet." });
            void navigate({ to: "/dashboard" });
          }}
        >
          Criar conta
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="font-semibold text-ink underline">
            Entrar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}