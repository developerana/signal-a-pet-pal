import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
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

export const Route = createFileRoute("/animal-encontrado")({
  head: () => ({
    meta: [
      { title: "Encontrei um animal — SinalizaPet" },
      {
        name: "description",
        content:
          "Registre um animal encontrado, informe estado de saúde e região: cruzamos com as ocorrências de desaparecimento.",
      },
      { property: "og:title", content: "Encontrei um animal — SinalizaPet" },
      {
        property: "og:description",
        content: "Ajude um animal sob seus cuidados temporários a voltar para casa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FoundAnimal,
});

function FoundAnimal() {
  const navigate = useNavigate();

  const submit = () => {
    toast.success("Animal encontrado registrado", {
      description: "Vamos cruzar com as ocorrências de desaparecimento da região.",
    });
    void navigate({ to: "/buscar" });
  };

  return (
    <AppShell>
      <PageHeader
        title="Encontrei um animal"
        description="Registre o animal que está sob seus cuidados temporários."
      />
      <div className="max-w-2xl">
        <Panel>
          <div className="grid gap-4">
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
              <Field label="Porte">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pequeno">Pequeno</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="grande">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Bairro onde encontrou" required>
                <Input placeholder="Savassi" />
              </Field>
              <Field label="Data" required>
                <Input type="date" />
              </Field>
            </div>

            <Field label="Estado de saúde" required>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saudavel">Aparentemente saudável</SelectItem>
                  <SelectItem value="ferido">Ferido</SelectItem>
                  <SelectItem value="debilitado">Debilitado</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Onde o animal está agora" hint="Sua casa, um abrigo, uma clínica...">
              <Input placeholder="Sob meus cuidados temporários" />
            </Field>

            <Field label="Características e comportamento">
              <Textarea rows={4} placeholder="Coleira sem placa, muito dócil, atende a chamados." />
            </Field>

            <PhotoPicker />
            <DemoNote />

            <Button
              size="lg"
              className="border-2 border-ink bg-status-found text-primary-foreground hover:bg-status-found/90"
              onClick={submit}
            >
              Registrar animal encontrado
            </Button>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}