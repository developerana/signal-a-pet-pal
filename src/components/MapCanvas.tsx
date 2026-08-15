import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StatusBadge, STATUS_META } from "@/components/StatusBadge";
import type { Occurrence } from "@/types";

/**
 * Mapa de demonstração.
 * Placeholder visual preparado para receber uma API de mapas real
 * (ex.: Mapbox / Google Maps) — os marcadores usam posições aproximadas
 * e nunca a localização residencial exata do tutor.
 */
export function MapCanvas({
  occurrences,
  className,
}: {
  occurrences: Occurrence[];
  className?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(occurrences[0]?.id ?? null);
  const selected = occurrences.find((o) => o.id === selectedId) ?? null;

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-accent/40", className)}>
      <div className="absolute inset-0 sand-grid" aria-hidden />
      <div className="absolute inset-0">
        {occurrences.map((o) => (
          <button
            key={o.id}
            onClick={() => setSelectedId(o.id)}
            style={{ left: `${o.map.x}%`, top: `${o.map.y}%` }}
            aria-label={`${o.name} — ${STATUS_META[o.status].label}`}
            className={cn(
              "absolute grid h-9 w-9 -translate-x-1/2 -translate-y-full place-items-center rounded-full rounded-bl-none border-2 border-background text-primary-foreground shadow-lift transition-transform",
              STATUS_META[o.status].dot,
              selectedId === o.id && "scale-110 ring-2 ring-primary",
            )}
          >
            <MapPin className="h-4 w-4" />
          </button>
        ))}
      </div>

      <div className="absolute left-3 top-3 rounded-xl border border-border bg-background/90 px-3 py-2 text-[11px] leading-relaxed">
        <p className="font-semibold">Localização aproximada</p>
        <p className="text-muted-foreground">Mapa de demonstração</p>
      </div>

      {selected && (
        <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-border bg-background p-3 shadow-lift sm:max-w-xs">
          <div className="flex gap-3">
            <img
              src={selected.photoUrl}
              alt={selected.name}
              loading="lazy"
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <StatusBadge status={selected.status} />
              <p className="mt-1 truncate font-display font-bold">{selected.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {selected.neighborhood} • {selected.date}
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="mt-3 w-full">
            <Link to="/ocorrencia/$id" params={{ id: selected.id }}>
              Abrir ocorrência
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export function MapLegend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
      {(["desaparecido", "avistado", "encontrado", "reencontrado"] as const).map((s) => (
        <span key={s} className="inline-flex items-center gap-1.5">
          <span className={cn("h-2.5 w-2.5 rounded-full", STATUS_META[s].dot)} />
          {STATUS_META[s].label}
        </span>
      ))}
    </div>
  );
}
