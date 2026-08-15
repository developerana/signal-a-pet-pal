import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, Eye } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNotice, Field, FormCard, PhotoPicker } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/novo-avistamento")({
  validateSearch: (search: Record<string, unknown>) => ({
    ocorrencia: typeof search["ocorrencia"] === "string" ? (search["ocorrencia"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sinalizar avistamento — SinalizaPet" },
      { name: "description", content: "Viu um animal? Registre o avistamento e avise o tutor." },
      { property: "og:title", content: "Sinalizar avistamento — SinalizaPet" },
      { property: "og:description", content: "Uma informação simples pode ajudar um pet a voltar para casa." },
    ],
  }),
  component: NovoAvistamento,
});

function NovoAvistamento() {
  const { ocorrencia } = Route.useSearch();
  const [target, setTarget] = useState(ocorrencia ?? "");
  const [sent, setSent] = useState(false);
  const occurrence = demoOccurrences.find((o) => o.id === target);

  if (sent) {
    return (
      <AppShell>
        <FormCard className="mx-auto max-w-lg text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-status-sighted">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Avistamento registrado!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sua informação pode ajudar esse animal a voltar para casa. O tutor será notificado assim que as
            notificações estiverem conectadas.
          </p>
          <div className="mt-6 grid gap-2">
            {occurrence && (
              <Button asChild>
                <Link to="/ocorrencia/$id" params={{ id: occurrence.id }}>Ver ocorrência</Link>
              </Button>
            )}
            <Button asChild variant="ghost">
              <Link to="/buscar">Ver outras ocorrências</Link>
            </Button>
          </div>
        </FormCard>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <PageHeader
          title="Eu vi um animal"
          description="Conte o que você viu. Qualquer detalhe ajuda na busca."
        />

        {occurrence && (
          <div className="mb-4 flex gap-3 rounded-2xl border-2 border-status-sighted bg-status-sighted/10 p-4">
            <img src={occurrence.photoUrl} alt={occurrence.name} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 font-display font-bold">
                <Eye className="h-4 w-4" /> Você viu {occurrence.name}?
              </p>
              <div className="mt-1"><StatusBadge status={occurrence.status} /></div>
            </div>
          </div>
        )}

        <FormCard className="space-y-5">
          <Field label="Sobre qual ocorrência é o avistamento?" hint="Se não souber, deixe em branco e descreva o animal.">
            <Select value={target} onValueChange={setTarget}>
              <SelectTrigger><SelectValue placeholder="Selecionar ocorrência (opcional)" /></SelectTrigger>
              <SelectContent>
                {demoOccurrences
                  .filter((o) => o.status !== "obito")
                  .map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.name} • {o.species} • {o.neighborhood}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Bairro / localização aproximada" htmlFor="local"><Input id="local" placeholder="Ex.: próximo à praça" /></Field>
            <Field label="Rua ou referência" htmlFor="ref"><Input id="ref" placeholder="Ex.: rua das Acácias" /></Field>
            <Field label="Data" htmlFor="data"><Input id="data" type="date" /></Field>
            <Field label="Horário" htmlFor="hora"><Input id="hora" type="time" /></Field>
          </div>

          <PhotoPicker label="Foto (opcional)" hint="Mesmo uma foto de longe ajuda a confirmar." />

          <Field label="O que você viu?" htmlFor="desc">
            <Textarea
              id="desc"
              rows={4}
              placeholder="Vi um gato preto próximo à praça por volta das 18h. Ele estava caminhando em direção à avenida."
            />
          </Field>

          <Field label="Comportamento observado">
            <Select defaultValue="assustado">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="calmo">Calmo</SelectItem>
                <SelectItem value="assustado">Assustado</SelectItem>
                <SelectItem value="arisco">Arisco, fugiu</SelectItem>
                <SelectItem value="ferido">Parecia ferido</SelectItem>
                <SelectItem value="acompanhado">Estava com alguém</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <DemoNotice>
            Demonstração: o avistamento e a notificação ao tutor serão enviados de verdade quando o
            backend estiver conectado.
          </DemoNotice>

          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              setSent(true);
              toast.success("Avistamento registrado!", {
                description: "Sua informação pode ajudar esse animal a voltar para casa.",
              });
            }}
          >
            Enviar avistamento
          </Button>
        </FormCard>
      </div>
    </AppShell>
  );
}
