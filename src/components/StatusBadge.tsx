import { cn } from "@/lib/utils";
import type { OccurrenceStatus } from "@/types";

export const STATUS_META: Record<
  OccurrenceStatus,
  { label: string; dot: string; chip: string; emoji: string }
> = {
  desaparecido: { label: "Desaparecido", dot: "bg-status-missing", chip: "bg-status-missing text-primary-foreground", emoji: "🚨" },
  avistado: { label: "Avistado", dot: "bg-status-sighted", chip: "bg-status-sighted text-primary", emoji: "👀" },
  encontrado: { label: "Encontrado", dot: "bg-status-found", chip: "bg-status-found text-primary-foreground", emoji: "🏠" },
  reencontrado: { label: "Reencontrado", dot: "bg-status-reunited", chip: "bg-status-reunited text-primary", emoji: "🐾" },
  obito: { label: "Óbito", dot: "bg-status-deceased", chip: "bg-muted text-muted-foreground border border-border", emoji: "" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: OccurrenceStatus;
  className?: string;
}) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        meta.chip,
        className,
      )}
    >
      {status !== "obito" && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />}
      {meta.label}
    </span>
  );
}
