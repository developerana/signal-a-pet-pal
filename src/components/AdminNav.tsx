import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Visão geral" },
  { to: "/admin/ocorrencias", label: "Ocorrências" },
  { to: "/admin/usuarios", label: "Usuários" },
  { to: "/admin/denuncias", label: "Denúncias" },
] as const;

export function AdminNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {items.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "overline border-2 border-ink px-3 py-2",
              active ? "bg-ink text-primary-foreground" : "bg-paper hover:bg-secondary",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}