import { Link } from "@tanstack/react-router";
import { Eye, MapPin } from "lucide-react";
import type { Occurrence } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

export function OccurrenceCard({
  occurrence: o,
  className,
}: {
  occurrence: Occurrence;
  className?: string;
}) {
  return (
    <Link
      to="/ocorrencia/$id"
      params={{ id: o.id }}
      className={cn(
        "poster group grid grid-cols-[104px_minmax(0,1fr)] gap-4 p-3 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:grid-cols-[140px_minmax(0,1fr)] sm:p-4",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden border-2 border-ink bg-secondary">
        <img
          src={o.photoUrl}
          alt={`${o.name}, ${o.species}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={o.status} />
          <span className="overline text-muted-foreground">{o.date}</span>
        </div>
        <h3 className="mt-2 truncate text-xl font-extrabold uppercase leading-none sm:text-2xl">
          {o.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-foreground/75">{o.summary}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {o.neighborhood} · ~{o.distanceKm} km
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {o.sightingsCount} sinalizações
          </span>
        </div>
      </div>
    </Link>
  );
}