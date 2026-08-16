import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNote, Field, Panel, Stat } from "@/components/FormKit";
import { BrandMark } from "@/components/BrandMark";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { demoUser } from "@/data/demo";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — SinalizaPet" },
      {
        name: "description",
        content: "Gerencie seus dados, região de alertas e preferências de notificação no SinalizaPet.",
      },
      { property: "og:title", content: "Meu perfil — SinalizaPet" },
      { property: "og:description", content: "Dados, alertas e preferências da sua conta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader title="Perfil" description="Seus dados e preferências de alerta." />

      <div className="grid gap-6">
        <Panel className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <span className="grid h-20 w-20 place-items-center border-2 border-ink bg-accent">
            <BrandMark className="h-11 w-11" />
          </span>
          <div className="min-w-0">
            <p className="eyebrow text-muted-foreground">{BRAND.name}</p>
            <h2 className="truncate text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
              {demoUser.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {demoUser.city} · desde {demoUser.memberSince}
            </p>
          </div>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Sinalizações" value={demoUser.signals} />
          <Stat label="Reencontros" value={2} tone="text-status-reunited" />
          <Stat label="Ocorrências" value={3} />
          <Stat label="Animais" value={2} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Panel title="Dados pessoais">
            <div className="grid gap-5">
              <Field label="Nome">
                <Input defaultValue={demoUser.name} />
              </Field>
              <Field label="Cidade">
                <Input defaultValue={demoUser.city} />
              </Field>
              <Field label="E-mail">
                <Input type="email" defaultValue="ana@email.com" />
              </Field>
              <Field label="Telefone" hint="Nunca exibido publicamente.">
                <Input defaultValue="(31) 9 ****-**89" />
              </Field>
            </div>
          </Panel>

          <Panel title="Alertas">
            <div className="grid gap-4">
              {[
                { label: "Avistamentos das minhas ocorrências", desc: "Aviso imediato no app." },
                { label: "Ocorrências próximas", desc: "Até 5 km da minha região." },
                { label: "Resumo semanal", desc: "Um e-mail com o que aconteceu por perto." },
              ].map((a, i) => (
                <div key={a.label} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{a.label}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  <Switch defaultChecked={i < 2} />
                </div>
              ))}
              <DemoNote />
            </div>
          </Panel>
        </div>

        <Panel title="Atalhos">
          <div className="grid gap-3 sm:grid-cols-3">
            <Button asChild variant="outline" className="justify-start border-2 border-ink">
              <Link to="/minhas-ocorrencias">Minhas ocorrências</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start border-2 border-ink">
              <Link to="/meus-animais">Meus animais</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start text-muted-foreground">
              <Link to="/">
                <LogOut className="h-4 w-4" /> Sair
              </Link>
            </Button>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}