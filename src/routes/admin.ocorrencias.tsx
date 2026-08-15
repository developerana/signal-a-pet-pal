import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AdminNav } from "@/components/AdminNav";
import { StatusBadge } from "@/components/StatusBadge";
import { DemoNotice } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/admin/ocorrencias")({
  head: () => ({
    meta: [
      { title: "Ocorrências — Administração SinalizaPet" },
      { name: "description", content: "Moderação e acompanhamento de todas as ocorrências." },
      { property: "og:title", content: "Ocorrências — Administração SinalizaPet" },
      { property: "og:description", content: "Lista completa de ocorrências para moderação." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOcorrencias,
});

function AdminOcorrencias() {
  return (
    <AppShell>
      <PageHeader title="Ocorrências" description="Todas as ocorrências registradas na plataforma." />
      <AdminNav current="/admin/ocorrencias" />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Animal</TableHead>
              <TableHead>Espécie</TableHead>
              <TableHead>Bairro</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Avistamentos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoOccurrences.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.name}</TableCell>
                <TableCell className="capitalize">{o.species}</TableCell>
                <TableCell>{o.neighborhood}</TableCell>
                <TableCell>{o.date}</TableCell>
                <TableCell>{o.sightingsCount}</TableCell>
                <TableCell><StatusBadge status={o.status} /></TableCell>
                <TableCell>
                  <Button asChild size="sm" variant="ghost">
                    <Link to="/ocorrencia/$id" params={{ id: o.id }}>Abrir</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <DemoNotice>Ações de moderação serão habilitadas com autenticação e perfis de administrador.</DemoNotice>
      </div>
    </AppShell>
  );
}
