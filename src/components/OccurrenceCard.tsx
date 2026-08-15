import { Link } from "@tanstack/react-router";
import { Clock, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { ShareDialog } from "@/components/ShareDialog";
import type { Occurrence } from "@/types";

export function OccurrenceCard({ occurrence }: { occurrence: Occurrence }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <div className="flex gap-4 p-4 sm:p-5">
        <Link
          to="/ocorrencia/$id"
          params={{ id: occurrence.id }}
          className="shrink-0"
          aria-label={`Ver ocorrência de ${occurrence.name}`}
        >
          <img
            src={occurrence.photoUrl}
            alt={`${occurrence.name}, ${occurrence.species}`}
            loading="lazy"
            width={768}
            height={768}
            className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold">{occurrence.name}</h3>
              <p className="truncate text-sm capitalize text-muted-foreground">
                {occurrence.species}
                {occurrence.breed ? ` • ${occurrence.breed}` : ""}
              </p>
            </div>
            <StatusBadge status={occurrence.status} />
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {occurrence.neighborhood} • ~
              {occurrence.distanceKm.toString().replace(".", ",")} km
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {occurrence.date}
            </span>
            {occurrence.sightingsCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> {occurrence.sightingsCount} avistamento
                {occurrence.sightingsCount > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{occurrence.summary}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border bg-secondary/40 px-4 py-3">
        <Button asChild size="sm">
          <Link to="/ocorrencia/$id" params={{ id: occurrence.id }}>
            Ver ocorrência
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="gap-2">
          <Link to="/novo-avistamento" search={{ ocorrencia: occurrence.id }}>
            <Eye className="h-4 w-4" /> Sinalizar avistamento
          </Link>
        </Button>
        <ShareDialog occurrence={occurrence} />
      </div>
    </article>
  );
}
