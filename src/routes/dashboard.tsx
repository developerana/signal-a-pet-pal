import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Siren } from "lucide-react";
import { AppShell, QuickActions } from "@/components/AppShell";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { MapCanvas, MapLegend } from "@/components/MapCanvas";
import { Button } from "@/components/ui/button";
import { demoNotifications, demoOccurrences, demoUser } from "@/data/demo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Início — SinalizaPet" },
      { name: "description", content: "Feed de ocorrências da sua região, avistamentos e ações rápidas." },
      { property: "og:title", content: "Início — SinalizaPet" },
      { property: "og:description", content: "Acompanhe ocorrências próximas e sinalize avistamentos." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const feed = demoOccurrences.filter((o) => o.status !== "obito");

  return (
    <AppShell>
      <section className="overflow-hidden rounded-2xl border border-border bg-accent/50 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
          Olá, {demoUser.name.split(" ")[0]}
        </p>
        <h1 className="mt-2 max-w-xl text-2xl font-bold sm:text-3xl">
          Tem um animal desaparecido na sua região? Sua informação pode ajudar.
        </h1>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild size="lg" className="gap-2 bg-status-missing text-primary-foreground hover:bg-status-missing/90">
            <Link to="/nova-ocorrencia">
              <Siren className="h-5 w-5" /> Cadastrar desaparecimento
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 bg-background">
            <Link to="/novo-avistamento" search={{ ocorrencia: undefined }}>
              <Eye className="h-5 w-5" /> Sinalizar avistamento
            </Link>
          </Button>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="mb-3 text-xl font-bold">Ocorrências por perto</h2>
          <div className="grid gap-4">
            {feed.map((o) => (
              <OccurrenceCard key={o.id} occurrence={o} />
            ))}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <h3 className="mb-3 font-display text-base font-bold">Ações rápidas</h3>
            <QuickActions />
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <h3 className="mb-3 font-display text-base font-bold">Mapa da região</h3>
            <MapCanvas occurrences={feed} className="h-56" />
            <div className="mt-3">
              <MapLegend />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <h3 className="truncate font-display text-base font-bold">Notificações</h3>
              <Button asChild variant="ghost" size="sm">
                <Link to="/notificacoes">Ver todas</Link>
              </Button>
            </div>
            <ul className="space-y-3">
              {demoNotifications.slice(0, 3).map((n) => (
                <li key={n.id} className="text-sm">
                  <p className="font-medium">🔔 {n.title}</p>
                  <p className="text-muted-foreground">{n.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
