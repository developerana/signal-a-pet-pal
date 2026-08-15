import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/admin", label: "Visão geral" },
  { to: "/admin/ocorrencias", label: "Ocorrências" },
  { to: "/admin/usuarios", label: "Usuários" },
  { to: "/admin/denuncias", label: "Denúncias" },
] as const;

export function AdminNav({ current }: { current: string }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {items.map((i) => (
        <Button key={i.to} asChild size="sm" variant={current === i.to ? "default" : "outline"}>
          <Link to={i.to}>{i.label}</Link>
        </Button>
      ))}
    </div>
  );
}

export function BarChartList({
  data,
  title,
}: {
  data: { label: string; value: number }[];
  title: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="font-display text-base font-bold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {data.map((d) => (
          <li key={d.label}>
            <div className="flex justify-between text-sm">
              <span>{d.label}</span>
              <span className="text-muted-foreground">{d.value}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-secondary">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${(d.value / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
