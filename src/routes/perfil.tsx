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

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="grid gap-4">
          <Panel>
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center border-2 border-ink bg-accent">
                <BrandMark className="h-9 w-9" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-extrabold uppercase leading-tight">
                  {demoUser.name}
                </h2>
                <p className="eyebrow text-muted-foreground">
                  {demoUser.city} · desde {demoUser.memberSince}
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Stat label="Sinalizações" value={demoUser.signals} />
              <Stat label="Reencontros" value={2} tone="text-status-reunited" />
            </div>
          </Panel>

          <Panel title="Atalhos">
            <div className="grid gap-2">
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

        <div className="grid gap-4">
          <Panel title="Dados pessoais">
            <div className="grid gap-4 sm:grid-cols-2">
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
      </div>
    </AppShell>
  );
}