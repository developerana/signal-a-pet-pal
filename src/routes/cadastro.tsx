import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { DemoNote, Field } from "@/components/FormKit";
import { UsernameField } from "@/components/UsernameField";
import { AuthLayout } from "@/routes/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoTakenUsernames } from "@/data/demo";

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
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  return (
    <AuthLayout title="Criar conta" subtitle="Leva menos de um minuto.">
      <div className="grid gap-4">
        <Field label="Nome" required>
          <Input placeholder="Seu nome" />
        </Field>
        <UsernameField
          taken={demoTakenUsernames}
          onChange={(value, valid) => {
            setUsername(value);
            setUsernameValid(valid);
          }}
        />
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
            if (!usernameValid) {
              toast.error("Escolha um username válido", {
                description: "Ele precisa ser único e não pode ser reservado pelo sistema.",
              });
              return;
            }
            signInDemo({ username });
            toast.success("Conta criada", { description: `Bem-vinda ao SinalizaPet, @${username}.` });
            void navigate({ to: takePendingRedirect() ?? "/dashboard" });
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