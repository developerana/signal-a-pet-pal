import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell } from "lucide-react";
import { AppShell, PageHeader, QuickActions } from "@/components/AppShell";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { MapCanvas, MapLegend } from "@/components/MapCanvas";
import { Panel, Stat } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { demoNotifications, demoOccurrences, demoUser } from "@/data/demo";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Início — SinalizaPet" },
      {
        name: "description",
        content:
          "Seu painel do SinalizaPet: ocorrências perto de você, avistamentos recentes e atalhos para sinalizar.",
      },
      { property: "og:title", content: "Painel — SinalizaPet" },
      {
        property: "og:description",
        content: "Acompanhe ocorrências próximas e sinalize em poucos toques.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const nearby = demoOccurrences.filter((o) => o.distanceKm <= 5).slice(0, 3);
  const unread = demoNotifications.filter((n) => !n.read);

  return (
    <AppShell>
      <PageHeader
        title={`Olá, ${demoUser.name.split(" ")[0]}`}
        description={`${demoUser.city} · membro desde ${demoUser.memberSince}`}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Perto de você" value={nearby.length} />
        <Stat label="Suas sinalizações" value={demoUser.signals} />
        <Stat label="Não lidas" value={unread.length} tone="text-status-missing" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div className="grid gap-6">
          <Panel
            title="Perto de você"
            action={
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link to="/buscar">
                  Ver todas <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <div className="grid gap-4">
              {nearby.map((o) => (
                <OccurrenceCard key={o.id} occurrence={o} />
              ))}
            </div>
          </Panel>

          <Panel
            title="No mapa"
            action={
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link to="/mapa">
                  Abrir mapa <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <MapCanvas occurrences={demoOccurrences} className="h-[300px]" />
            <div className="mt-3">
              <MapLegend />
            </div>
          </Panel>
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <Panel title="Sinalizar agora">
            <QuickActions />
          </Panel>
          <Panel
            title="Notificações"
            action={
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link to="/notificacoes">
                  Ver todas <Bell className="h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <ul className="grid gap-3">
              {demoNotifications.slice(0, 3).map((n) => (
                <li key={n.id} className="border-2 border-ink bg-secondary p-3">
                  <p className="text-sm font-bold">{n.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
                  <p className="eyebrow mt-2 text-muted-foreground">{n.time}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}