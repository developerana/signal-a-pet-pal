import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AdminNav } from "@/components/AdminNav";
import { StatusBadge } from "@/components/StatusBadge";
import { DemoNote } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/admin/ocorrencias")({
  head: () => ({
    meta: [
      { title: "Moderar ocorrências — SinalizaPet" },
      {
        name: "description",
        content: "Lista de ocorrências da plataforma para revisão, ajuste de status e moderação.",
      },
      { property: "og:title", content: "Moderar ocorrências — SinalizaPet" },
      { property: "og:description", content: "Revisão e moderação das ocorrências abertas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOccurrences,
});

function AdminOccurrences() {
  return (
    <AppShell>
      <PageHeader title="Ocorrências" description="Revisão e moderação." />
      <AdminNav />
      <div className="mt-6 overflow-x-auto border-2 border-ink bg-paper">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b-2 border-ink bg-secondary">
            <tr className="text-left">
              {["Animal", "Status", "Região", "Data", "Avistamentos", ""].map((h) => (
                <th key={h} className="eyebrow px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoOccurrences.map((o) => (
              <tr key={o.id} className="border-b border-ink/15 last:border-0">
                <td className="px-4 py-3 font-semibold">{o.name}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3">
                  {o.neighborhood}, {o.city}
                </td>
                <td className="px-4 py-3">{o.date}</td>
                <td className="px-4 py-3">{o.sightingsCount}</td>
                <td className="px-4 py-3 text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/ocorrencia/$id" params={{ id: o.id }}>
                      Abrir
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 max-w-xl">
        <DemoNote />
      </div>
    </AppShell>
  );
}