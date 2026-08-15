import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AdminNav, BarChartList } from "@/components/AdminNav";
import { DemoNotice } from "@/components/FormKit";
import { STATUS_META } from "@/components/StatusBadge";
import { demoAdminStats, demoByNeighborhood, demoBySpecies, demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Administração — SinalizaPet" },
      { name: "description", content: "Indicadores de ocorrências, avistamentos e reencontros da plataforma." },
      { property: "og:title", content: "Administração — SinalizaPet" },
      { property: "og:description", content: "Painel administrativo com indicadores da comunidade." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const s = demoAdminStats;
  const byStatus = (["desaparecido", "avistado", "encontrado", "reencontrado", "obito"] as const).map((st) => ({
    label: STATUS_META[st].label,
    value: demoOccurrences.filter((o) => o.status === st).length * 4 + 1,
  }));

  return (
    <AppShell>
      <PageHeader title="Administração" description="Panorama da plataforma e da comunidade." />
      <AdminNav current="/admin" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {[
          ["Ocorrências ativas", s.activeOccurrences],
          ["Animais desaparecidos", s.missing],
          ["Animais encontrados", s.found],
          ["Reencontros", s.reunited],
          ["Avistamentos", s.sightings],
          ["Usuários cadastrados", s.users],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <p className="font-display text-3xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <BarChartList title="Ocorrências por região" data={demoByNeighborhood} />
        <BarChartList title="Ocorrências por espécie" data={demoBySpecies} />
        <BarChartList title="Ocorrências por status" data={byStatus} />
      </div>

      <div className="mt-4">
        <DemoNotice>Indicadores de demonstração, prontos para consultas reais ao banco de dados.</DemoNotice>
      </div>
    </AppShell>
  );
}
