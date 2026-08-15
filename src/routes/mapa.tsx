import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { MapCanvas, MapLegend } from "@/components/MapCanvas";
import { DemoNote, Panel } from "@/components/FormKit";
import { demoByNeighborhood, demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de ocorrências — SinalizaPet" },
      {
        name: "description",
        content:
          "Veja as ocorrências de animais desaparecidos, avistados e encontrados por região, sempre em localização aproximada.",
      },
      { property: "og:title", content: "Mapa de ocorrências — SinalizaPet" },
      {
        property: "og:description",
        content: "Marcadores por status e por bairro, sem expor endereços exatos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    <AppShell>
      <PageHeader
        title="Mapa"
        description="Ocorrências por região, em localização aproximada por bairro."
      />
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-4">
          <MapCanvas occurrences={demoOccurrences} className="h-[420px] sm:h-[520px]" />
          <MapLegend />
          <DemoNote>Mapa ilustrativo: a versão final usará geolocalização por bairro.</DemoNote>
        </div>
        <Panel title="Bairros com mais ocorrências">
          <ul className="grid gap-3">
            {demoByNeighborhood.map((n) => (
              <li key={n.label} className="grid gap-1">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{n.label}</span>
                  <span>{n.value}</span>
                </div>
                <div className="h-3 border-2 border-ink bg-secondary">
                  <div
                    className="h-full bg-status-missing"
                    style={{ width: `${(n.value / 12) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}