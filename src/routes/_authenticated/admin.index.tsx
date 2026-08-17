import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AdminNav } from "@/components/AdminNav";
import { DemoNote, Panel, Stat } from "@/components/FormKit";
import { demoAdminStats, demoBySpecies, demoByNeighborhood } from "@/data/demo";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — SinalizaPet" },
      {
        name: "description",
        content: "Indicadores da rede: ocorrências ativas, avistamentos, reencontros e distribuição por região.",
      },
      { property: "og:title", content: "Painel administrativo — SinalizaPet" },
      { property: "og:description", content: "Visão geral da operação da plataforma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  return (
    <AppShell>
      <PageHeader title="Administração" description="Visão geral da rede." />
      <AdminNav />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Ocorrências ativas" value={demoAdminStats.activeOccurrences} />
        <Stat label="Desaparecidos" value={demoAdminStats.missing} tone="text-status-missing" />
        <Stat label="Reencontrados" value={demoAdminStats.reunited} tone="text-status-reunited" />
        <Stat label="Pessoas na rede" value={demoAdminStats.users} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Por espécie">
          <ul className="grid gap-3">
            {demoBySpecies.map((s) => (
              <li key={s.label} className="grid gap-1">
                <div className="flex justify-between text-sm font-semibold">
                  <span>{s.label}</span>
                  <span>{s.value}</span>
                </div>
                <div className="h-3 border-2 border-ink bg-secondary">
                  <div className="h-full bg-status-found" style={{ width: `${(s.value / 18) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Por bairro">
          <ul className="grid gap-3">
            {demoByNeighborhood.map((s) => (
              <li key={s.label} className="grid gap-1">
                <div className="flex justify-between text-sm font-semibold">
                  <span>{s.label}</span>
                  <span>{s.value}</span>
                </div>
                <div className="h-3 border-2 border-ink bg-secondary">
                  <div className="h-full bg-status-sighted" style={{ width: `${(s.value / 12) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="mt-6 max-w-xl">
        <DemoNote>Indicadores de demonstração.</DemoNote>
      </div>
    </AppShell>
  );
}