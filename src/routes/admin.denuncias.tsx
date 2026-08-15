import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AdminNav } from "@/components/AdminNav";
import { DemoNote } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { demoReports } from "@/data/demo";

export const Route = createFileRoute("/admin/denuncias")({
  head: () => ({
    meta: [
      { title: "Denúncias — SinalizaPet" },
      {
        name: "description",
        content: "Fila de denúncias de informação falsa, conteúdo duplicado e condutas inadequadas.",
      },
      { property: "og:title", content: "Denúncias — SinalizaPet" },
      { property: "og:description", content: "Moderação de conteúdo e condutas na plataforma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminReports,
});

function AdminReports() {
  return (
    <AppShell>
      <PageHeader title="Denúncias" description="Fila de moderação da comunidade." />
      <AdminNav />
      <ul className="mt-6 grid gap-3">
        {demoReports.map((r) => (
          <li key={r.id} className="poster flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-bold">{r.target}</p>
              <p className="mt-1 text-sm text-foreground/80">{r.reason}</p>
              <p className="eyebrow mt-2 text-muted-foreground">
                {r.date} · {r.status}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" className="border-2 border-ink">
                Arquivar
              </Button>
              <Button
                size="sm"
                className="border-2 border-ink bg-status-missing text-primary-foreground hover:bg-status-missing/90"
              >
                Remover conteúdo
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 max-w-xl">
        <DemoNote />
      </div>
    </AppShell>
  );
}