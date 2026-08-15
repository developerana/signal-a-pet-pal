import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { StatusBadge, STATUS_META } from "@/components/StatusBadge";
import { ShareDialog } from "@/components/ShareDialog";
import { DemoNotice } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { demoOccurrences } from "@/data/demo";
import type { OccurrenceStatus } from "@/types";

export const Route = createFileRoute("/minhas-ocorrencias")({
  head: () => ({
    meta: [
      { title: "Minhas ocorrências — SinalizaPet" },
      { name: "description", content: "Acompanhe e atualize o status das ocorrências que você criou." },
      { property: "og:title", content: "Minhas ocorrências — SinalizaPet" },
      { property: "og:description", content: "Gerencie suas ocorrências e acompanhe avistamentos." },
    ],
  }),
  component: MinhasOcorrencias,
});

const statuses: OccurrenceStatus[] = ["desaparecido", "avistado", "encontrado", "reencontrado", "obito"];

function MinhasOcorrencias() {
  // DEMO: as três primeiras ocorrências representam as do usuário atual.
  const mine = demoOccurrences.slice(0, 3);
  const [statusMap, setStatusMap] = useState<Record<string, OccurrenceStatus>>(
    Object.fromEntries(mine.map((o) => [o.id, o.status])),
  );

  return (
    <AppShell>
      <PageHeader title="Minhas ocorrências" description="Acompanhe a busca e atualize o status quando algo mudar." />
      <div className="grid gap-4">
        {mine.map((o) => (
          <div key={o.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
            <div className="flex gap-4">
              <img src={o.photoUrl} alt={o.name} loading="lazy" className="h-20 w-20 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                  <h2 className="truncate text-lg font-bold">{o.name}</h2>
                  <StatusBadge status={statusMap[o.id]} />
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {o.neighborhood} • {o.date} • {o.sightingsCount} avistamento
                  {o.sightingsCount === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Select
                value={statusMap[o.id]}
                onValueChange={(v) => {
                  setStatusMap((m) => ({ ...m, [o.id]: v as OccurrenceStatus }));
                  toast.success("Status atualizado nesta sessão", {
                    description: `${o.name}: ${STATUS_META[v as OccurrenceStatus].label}. Será salvo quando o banco de dados estiver conectado.`,
                  });
                }}
              >
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>{STATUS_META[s].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button asChild size="sm" variant="outline">
                <Link to="/ocorrencia/$id" params={{ id: o.id }}>Ver ocorrência</Link>
              </Button>
              <ShareDialog occurrence={o} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <DemoNotice>
          Alterações de status ficam apenas nesta sessão nesta versão de demonstração.
        </DemoNotice>
      </div>
    </AppShell>
  );
}
