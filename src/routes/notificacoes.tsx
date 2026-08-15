import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNotice } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { demoNotifications } from "@/data/demo";

export const Route = createFileRoute("/notificacoes")({
  head: () => ({
    meta: [
      { title: "Notificações — SinalizaPet" },
      { name: "description", content: "Avistamentos, ocorrências próximas e atualizações de status." },
      { property: "og:title", content: "Notificações — SinalizaPet" },
      { property: "og:description", content: "Fique por dentro dos avistamentos e ocorrências da sua região." },
    ],
  }),
  component: Notificacoes,
});

function Notificacoes() {
  return (
    <AppShell>
      <PageHeader title="Notificações" description="O que aconteceu desde a sua última visita." />
      <ul className="grid gap-3">
        {demoNotifications.map((n) => (
          <li
            key={n.id}
            className={cn(
              "rounded-2xl border bg-card p-4 shadow-soft",
              n.read ? "border-border" : "border-primary/30",
            )}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="font-display font-bold">🔔 {n.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
            </div>
            {n.occurrenceId && (
              <Button asChild size="sm" variant="outline" className="mt-3">
                <Link to="/ocorrencia/$id" params={{ id: n.occurrenceId }}>Abrir ocorrência</Link>
              </Button>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <DemoNotice>
          Notificações de demonstração. Push e e-mail serão ativados com o backend de notificações.
        </DemoNotice>
      </div>
    </AppShell>
  );
}
