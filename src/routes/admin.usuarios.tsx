import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AdminNav } from "@/components/AdminNav";
import { DemoNotice } from "@/components/FormKit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/admin/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuários — Administração SinalizaPet" },
      { name: "description", content: "Usuários cadastrados, participação e moderação." },
      { property: "og:title", content: "Usuários — Administração SinalizaPet" },
      { property: "og:description", content: "Gestão de usuários da comunidade." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminUsuarios,
});

// DEMO: usuários fictícios, sem dados pessoais reais.
const users = [
  { id: "u1", handle: "@ana.h", city: "Belo Horizonte", occurrences: 3, sightings: 8, since: "05/2026" },
  { id: "u2", handle: "@rvieira", city: "Belo Horizonte", occurrences: 1, sightings: 2, since: "04/2026" },
  { id: "u3", handle: "@lu.campos", city: "Contagem", occurrences: 0, sightings: 11, since: "03/2026" },
  { id: "u4", handle: "@petcentro", city: "Belo Horizonte", occurrences: 6, sightings: 4, since: "02/2026" },
];

function AdminUsuarios() {
  return (
    <AppShell>
      <PageHeader title="Usuários" description="Participação da comunidade, sem exposição de dados pessoais." />
      <AdminNav current="/admin/usuarios" />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Ocorrências</TableHead>
              <TableHead>Avistamentos</TableHead>
              <TableHead>Desde</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.handle}</TableCell>
                <TableCell>{u.city}</TableCell>
                <TableCell>{u.occurrences}</TableCell>
                <TableCell>{u.sightings}</TableCell>
                <TableCell>{u.since}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <DemoNotice>
          E-mails e telefones nunca aparecem no painel. Bloqueio de usuários será liberado com a
          autenticação e os papéis de acesso.
        </DemoNotice>
      </div>
    </AppShell>
  );
}
