import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { MapCanvas, MapLegend } from "@/components/MapCanvas";
import { DemoNotice } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { demoOccurrences } from "@/data/demo";
import type { OccurrenceStatus } from "@/types";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de ocorrências — SinalizaPet" },
      { name: "description", content: "Veja desaparecimentos, avistamentos e animais encontrados por região." },
      { property: "og:title", content: "Mapa de ocorrências — SinalizaPet" },
      { property: "og:description", content: "Marcadores por status em localização aproximada, para proteger a privacidade dos tutores." },
    ],
  }),
  component: MapaPage,
});

const filters: (OccurrenceStatus | "todos")[] = [
  "todos",
  "desaparecido",
  "avistado",
  "encontrado",
  "reencontrado",
];

function MapaPage() {
  const [filter, setFilter] = useState<OccurrenceStatus | "todos">("todos");
  const list = demoOccurrences.filter((o) => (filter === "todos" ? o.status !== "obito" : o.status === filter));

  return (
    <AppShell>
      <PageHeader title="Mapa" description="Ocorrências por região, sempre em localização aproximada." />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f === "todos" ? "Todos" : f}
          </Button>
        ))}
      </div>

      <div className="mt-4">
        <MapCanvas occurrences={list} className="h-[65vh] min-h-[420px]" />
      </div>
      <div className="mt-3 space-y-3">
        <MapLegend />
        <DemoNotice>
          Mapa de demonstração. A integração com uma API de mapas e geolocalização real está preparada
          para ser conectada — por segurança, a localização exata da residência do tutor nunca é exibida.
        </DemoNotice>
      </div>
    </AppShell>
  );
}
