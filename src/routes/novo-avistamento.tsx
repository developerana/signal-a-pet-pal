import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNote, Field, Panel, PhotoPicker } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoOccurrences } from "@/data/demo";

const searchSchema = z.object({ ocorrencia: z.string().optional() });

export const Route = createFileRoute("/novo-avistamento")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sinalizar avistamento — SinalizaPet" },
      {
        name: "description",
        content:
          "Viu um animal na rua? Sinalize onde, quando e como ele estava — o tutor é avisado na hora.",
      },
      { property: "og:title", content: "Sinalizar avistamento — SinalizaPet" },
      {
        property: "og:description",
        content: "Uma informação pode encerrar uma busca de semanas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewSighting,
});

function NewSighting() {
  const { ocorrencia } = Route.useSearch();
  const navigate = useNavigate();
  const linked = demoOccurrences.find((o) => o.id === ocorrencia);

  const submit = () => {
    toast.success("Avistamento sinalizado", {
      description: linked
        ? `O tutor de ${linked.name} foi avisado.`
        : "Vamos cruzar sua sinalização com as ocorrências da região.",
    });
    void navigate({ to: linked ? "/ocorrencia/$id" : "/buscar", params: { id: linked?.id ?? "" } });
  };

  return (
    <AppShell>
      <PageHeader
        title="Eu vi um animal"
        description="Descreva o que viu. Detalhes de local e horário são os mais importantes."
      />
      <div className="max-w-2xl">
        <Panel>
          <div className="grid gap-4">
            {linked && (
              <div className="flex items-center gap-3 border-2 border-ink bg-status-sighted/40 p-3">
                <img
                  src={linked.photoUrl}
                  alt={linked.name}
                  className="h-12 w-12 border-2 border-ink object-cover"
                />
                <div className="min-w-0">
                  <p className="overline text-muted-foreground">Vinculado à ocorrência</p>
                  <p className="truncate text-sm font-bold">
                    {linked.name} — {linked.neighborhood}
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Espécie" required>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cachorro">Cachorro</SelectItem>
                    <SelectItem value="gato">Gato</SelectItem>
                    <SelectItem value="ave">Ave</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Cor predominante">
                <Input placeholder="Preto, caramelo..." />
              </Field>
              <Field label="Bairro onde viu" required>
                <Input placeholder="Centro" />
              </Field>
              <Field label="Ponto de referência">
                <Input placeholder="Perto da padaria da esquina" />
              </Field>
              <Field label="Data" required>
                <Input type="date" />
              </Field>
              <Field label="Horário aproximado" required>
                <Input type="time" />
              </Field>
            </div>

            <Field label="Como o animal estava" hint="Assustado, ferido, com coleira, acompanhado...">
              <Textarea rows={4} placeholder="Estava assustado, correndo em direção à avenida." />
            </Field>

            <PhotoPicker label="Foto do avistamento (opcional)" />
            <DemoNote>Seu contato não é exibido: o tutor responde pela plataforma.</DemoNote>

            <Button
              size="lg"
              className="border-2 border-ink bg-status-sighted text-primary hover:bg-status-sighted/80"
              onClick={submit}
            >
              Enviar sinalização
            </Button>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}