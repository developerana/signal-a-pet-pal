import type { OccurrenceStatus } from "@/types";
import { cn } from "@/lib/utils";

export const statusLabel: Record<OccurrenceStatus, string> = {
  desaparecido: "Desaparecido",
  avistado: "Avistado",
  encontrado: "Encontrado",
  reencontrado: "Reencontrado",
  obito: "Encerrada",
};

const statusTone: Record<OccurrenceStatus, string> = {
  desaparecido: "bg-status-missing text-primary-foreground",
  avistado: "bg-status-sighted text-primary",
  encontrado: "bg-status-found text-primary-foreground",
  reencontrado: "bg-status-reunited text-primary",
  obito: "bg-status-deceased text-primary-foreground",
};

export const statusDot: Record<OccurrenceStatus, string> = {
  desaparecido: "bg-status-missing",
  avistado: "bg-status-sighted",
  encontrado: "bg-status-found",
  reencontrado: "bg-status-reunited",
  obito: "bg-status-deceased",
};

export function StatusBadge({
  status,
  className,
}: {
  status: OccurrenceStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-1.5 border-2 border-ink px-2 py-1 leading-none",
        statusTone[status],
        className,
      )}
    >
      {statusLabel[status]}
    </span>
  );
}