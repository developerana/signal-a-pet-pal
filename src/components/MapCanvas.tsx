import { Link } from "@tanstack/react-router";
import type { Occurrence, OccurrenceStatus } from "@/types";
import { statusDot, statusLabel } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

const legendOrder: OccurrenceStatus[] = [
  "desaparecido",
  "avistado",
  "encontrado",
  "reencontrado",
  "obito",
];

export function MapCanvas({
  occurrences,
  className,
  preview = false,
}: {
  occurrences: Occurrence[];
  className?: string;
  /** Modo demonstração: marcadores não levam para a ocorrência interna. */
  preview?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-2 border-ink bg-accent/60 shadow-soft",
        className,
      )}
    >
      <div className="absolute inset-0 sand-grid opacity-70" aria-hidden />
      <div className="absolute inset-0 paper-grain opacity-40" aria-hidden />
      {occurrences.map((o) => {
        const label = `${o.name} — ${statusLabel[o.status]} em ${o.neighborhood}`;
        const marker = (
          <>
            <span
              className={cn(
                "block h-4 w-4 rounded-full border-2 border-ink",
                statusDot[o.status],
              )}
            />
            <span className="pointer-events-none absolute left-1/2 top-5 hidden -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-paper px-2 py-1 text-xs font-semibold group-hover:block">
              {o.name} · {o.neighborhood}
            </span>
          </>
        );
        const style = { left: `${o.map.x}%`, top: `${o.map.y}%` };
        const cls = "group absolute -translate-x-1/2 -translate-y-1/2";
        return preview ? (
          <div key={o.id} style={style} className={cls} aria-label={label}>
            {marker}
          </div>
        ) : (
          <Link
            key={o.id}
            to="/ocorrencia/$id"
            params={{ id: o.id }}
            style={style}
            className={cls}
            aria-label={label}
          >
            {marker}
          </Link>
        );
      })}
      <p className="absolute bottom-2 left-2 border-2 border-ink bg-paper/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide">
        Localização aproximada por bairro
      </p>
    </div>
  );
}

export function MapLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {legendOrder.map((s) => (
        <li key={s} className="flex items-center gap-2 text-xs font-medium">
          <span className={cn("h-3 w-3 rounded-full border-2 border-ink", statusDot[s])} />
          {statusLabel[s]}
        </li>
      ))}
    </ul>
  );
}