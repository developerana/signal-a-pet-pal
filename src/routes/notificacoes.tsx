import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Eye, MapPin, RefreshCcw } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { demoNotifications } from "@/data/demo";

export const Route = createFileRoute("/notificacoes")({
  head: () => ({
    meta: [
      { title: "Notificações — SinalizaPet" },
      {
        name: "description",
        content: "Avistamentos, ocorrências próximas e mudanças de status das buscas que você acompanha.",
      },
      { property: "og:title", content: "Notificações — SinalizaPet" },
      { property: "og:description", content: "Nada de perder um avistamento importante." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NotificationsPage,
});

const kindIcon = { avistamento: Eye, proxima: MapPin, status: RefreshCcw } as const;

function NotificationsPage() {
  return (
    <AppShell>
      <PageHeader title="Notificações" description="O que a rede sinalizou para você." />
      <ul className="grid max-w-2xl gap-3">
        {demoNotifications.map((n) => {
          const Icon = kindIcon[n.kind];
          return (
            <li
              key={n.id}
              className={cn("poster flex gap-3 p-4", !n.read && "border-l-8 border-l-status-missing")}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink bg-secondary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{n.title}</p>
                <p className="mt-1 text-sm text-foreground/80">{n.body}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="overline text-muted-foreground">{n.time}</span>
                  {n.occurrenceId && (
                    <Button asChild variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs">
                      <Link to="/ocorrencia/$id" params={{ id: n.occurrenceId }}>
                        Ver ocorrência
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Bell className="h-3.5 w-3.5" /> Você recebe alertas de ocorrências até 5 km da sua região.
      </p>
    </AppShell>
  );
}