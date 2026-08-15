import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AdminNav } from "@/components/AdminNav";
import { DemoNote } from "@/components/FormKit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuários — SinalizaPet" },
      {
        name: "description",
        content: "Gestão das pessoas cadastradas na rede: sinalizações, região e situação da conta.",
      },
      { property: "og:title", content: "Usuários — SinalizaPet" },
      { property: "og:description", content: "Gestão de contas da comunidade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminUsers,
});

const users = [
  { id: "u1", name: "Ana Helouise", city: "Belo Horizonte", signals: 8, status: "ativa" },
  { id: "u2", name: "Rafael Vieira", city: "Belo Horizonte", signals: 3, status: "em análise" },
  { id: "u3", name: "Camila Souza", city: "Contagem", signals: 12, status: "ativa" },
  { id: "u4", name: "Pedro Lima", city: "Belo Horizonte", signals: 1, status: "suspensa" },
];

function AdminUsers() {
  return (
    <AppShell>
      <PageHeader title="Usuários" description="Pessoas cadastradas na rede." />
      <AdminNav />
      <div className="mt-6 overflow-x-auto border-2 border-ink bg-paper">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b-2 border-ink bg-secondary">
            <tr className="text-left">
              {["Nome", "Cidade", "Sinalizações", "Situação", ""].map((h) => (
                <th key={h} className="eyebrow px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-ink/15 last:border-0">
                <td className="px-4 py-3 font-semibold">{u.name}</td>
                <td className="px-4 py-3">{u.city}</td>
                <td className="px-4 py-3">{u.signals}</td>
                <td className="px-4 py-3">
                  <span className="eyebrow border-2 border-ink bg-secondary px-2 py-0.5">{u.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">
                    Gerenciar
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