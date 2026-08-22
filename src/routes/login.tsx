import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { BrandMark, BrandWordmark } from "@/components/BrandMark";
import { BRAND } from "@/lib/brand";
import { DemoNote, Field } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — SinalizaPet" },
      {
        name: "description",
        content: "Acesse sua conta do SinalizaPet para acompanhar ocorrências e avistamentos.",
      },
      { property: "og:title", content: "Entrar — SinalizaPet" },
      { property: "og:description", content: "Acompanhe suas ocorrências e sinalizações." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <AuthLayout title="Entrar" subtitle="Bem-vinda de volta à rede.">
      <div className="grid gap-4">
        <Field label="E-mail" required>
          <Input
            type="email"
            placeholder="voce@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Senha" required>
          <Input type="password" placeholder="••••••••" />
        </Field>
        <DemoNote>Login de demonstração: qualquer dado entra no painel.</DemoNote>
        <Button
          size="lg"
          className="border-2 border-ink"
          onClick={() => {
            const username = normalizeUsername(email.split("@")[0] || "tutor");
            signInDemo({ username });
            toast.success("Bem-vinda de volta!");
            void navigate({ to: takePendingRedirect() ?? "/dashboard" });
          }}
        >
          Entrar
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link to="/cadastro" className="font-semibold text-ink underline">
            Criar conta
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}


export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-secondary paper-grain lg:grid-cols-2">
      <div className="hidden flex-col justify-between border-r-2 border-ink bg-ink p-10 text-primary-foreground lg:flex">
        <Link to="/" className="font-display text-xl font-black uppercase">
          {BRAND.name}
        </Link>
        <div>
          <p className="font-display text-4xl font-black uppercase leading-[0.9]">{BRAND.slogan}</p>
          <p className="mt-4 max-w-sm text-primary-foreground/70">
            Cada informação sinalizada aproxima um animal de casa.
          </p>
        </div>
        <BrandMark className="h-16 w-16 text-primary-foreground" />
      </div>
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden">
            <BrandWordmark className="mx-auto flex justify-center" />
          </Link>
          <div className="poster mt-6 p-6 sm:p-8">
            <h1 className="text-3xl font-black uppercase leading-none">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}