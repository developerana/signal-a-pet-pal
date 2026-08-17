import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { Stat } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/_authenticated/minhas-ocorrencias")({
  head: () => ({
    meta: [
      { title: "Minhas ocorrências — SinalizaPet" },
      {
        name: "description",
        content: "Acompanhe as ocorrências que você abriu, os avistamentos recebidos e o status de cada busca.",
      },
      { property: "og:title", content: "Minhas ocorrências — SinalizaPet" },
      { property: "og:description", content: "Status, avistamentos e histórico de cada busca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyOccurrences,
});

function MyOccurrences() {
  const mine = demoOccurrences.slice(0, 3);
  const active = mine.filter((o) => o.status === "desaparecido" || o.status === "avistado");
  const sightings = mine.reduce((acc, o) => acc + o.sightingsCount, 0);

  return (
    <AppShell>
      <PageHeader
        title="Minhas ocorrências"
        description="Tudo o que você abriu na plataforma."
        action={
          <Button asChild className="border-2 border-ink">
            <Link to="/nova-ocorrencia">
              <Plus className="h-4 w-4" /> Nova
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Abertas" value={active.length} tone="text-status-missing" />
        <Stat label="Total" value={mine.length} />
        <Stat label="Avistamentos recebidos" value={sightings} />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {mine.map((o) => (
          <OccurrenceCard key={o.id} occurrence={o} />
        ))}
      </div>
    </AppShell>
  );
}