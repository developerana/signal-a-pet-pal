import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AdminNav } from "@/components/AdminNav";
import { DemoNotice } from "@/components/FormKit";
import { Badge } from "@/components/ui/badge";
import { demoReports } from "@/data/demo";

export const Route = createFileRoute("/admin/denuncias")({
  head: () => ({
    meta: [
      { title: "Denúncias — Administração SinalizaPet" },
      { name: "description", content: "Fila de moderação de denúncias da comunidade." },
      { property: "og:title", content: "Denúncias — Administração SinalizaPet" },
      { property: "og:description", content: "Moderação de conteúdo e comportamento na plataforma." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDenuncias,
});

function AdminDenuncias() {
  return (
    <AppShell>
      <PageHeader title="Denúncias" description="Fila de moderação para manter a plataforma confiável." />
      <AdminNav current="/admin/denuncias" />
      <ul className="grid gap-3">
        {demoReports.map((r) => (
          <li key={r.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="truncate font-bold">{r.target}</p>
                <p className="text-sm text-muted-foreground">{r.reason}</p>
              </div>
              <Badge variant={r.status === "resolvida" ? "secondary" : "outline"} className="capitalize">
                {r.status}
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Recebida em {r.date}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <DemoNotice>
          Estrutura de moderação pronta: as ações de remover, ocultar e bloquear serão ligadas ao backend.
        </DemoNotice>
      </div>
    </AppShell>
  );
}
