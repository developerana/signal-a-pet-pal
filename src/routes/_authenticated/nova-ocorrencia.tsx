import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNote, Field, Panel, PhotoPicker, Stepper } from "@/components/FormKit";
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

export const Route = createFileRoute("/_authenticated/nova-ocorrencia")({
  head: () => ({
    meta: [
      { title: "Cadastrar desaparecimento — SinalizaPet" },
      {
        name: "description",
        content:
          "Registre o desaparecimento do seu animal em poucos minutos e mobilize a rede comunitária de busca.",
      },
      { property: "og:title", content: "Cadastrar desaparecimento — SinalizaPet" },
      {
        property: "og:description",
        content: "Fotos, características e região aproximada: tudo o que a rede precisa para ajudar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewOccurrence,
});

const steps = ["Animal", "Local e data", "Contato"] as const;

function NewOccurrence() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const submit = () => {
    toast.success("Ocorrência registrada", {
      description: "A rede já pode sinalizar avistamentos deste animal.",
    });
    void navigate({ to: "/minhas-ocorrencias" });
  };

  return (
    <AppShell>
      <PageHeader
        title="Meu pet desapareceu"
        description="Quanto mais detalhes, maior a chance de reconhecimento."
      />
      <div className="max-w-2xl">
        <Stepper steps={steps} current={step} />

        <Panel>
          {step === 0 && (
            <div className="grid gap-4">
              <Field label="Nome do animal" required>
                <Input placeholder="Ex.: Logan" />
              </Field>
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
                <Field label="Raça">
                  <Input placeholder="SRD, Poodle..." />
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
                <Field label="Cor predominante">
                  <Input placeholder="Preto, caramelo..." />
                </Field>
              </div>
              <Field label="Marcas e características" hint="Cicatrizes, coleira, manchas, comportamento.">
                <Textarea rows={4} placeholder="Coleira vermelha, mancha branca no peito..." />
              </Field>
              <PhotoPicker />
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cidade" required>
                  <Input placeholder="Belo Horizonte" />
                </Field>
                <Field label="Bairro" required>
                  <Input placeholder="Centro" />
                </Field>
                <Field label="Data do desaparecimento" required>
                  <Input type="date" />
                </Field>
                <Field label="Horário aproximado">
                  <Input type="time" />
                </Field>
              </div>
              <Field label="Ponto de referência" hint="Exibimos apenas a região aproximada, nunca o endereço exato.">
                <Input placeholder="Próximo à praça, mercado..." />
              </Field>
              <Field label="Como aconteceu">
                <Textarea rows={4} placeholder="Fugiu pelo portão durante a chuva..." />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <Field label="Como quer ser contatado" required>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chat">Chat da plataforma</SelectItem>
                    <SelectItem value="whatsapp-mediado">WhatsApp mediado</SelectItem>
                    <SelectItem value="email-mediado">E-mail mediado</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Recompensa (opcional)">
                <Input placeholder="Ex.: R$ 300" />
              </Field>
              <Field label="Observações para quem encontrar">
                <Textarea rows={4} placeholder="É medroso, não corra atrás. Ligue primeiro." />
              </Field>
              <DemoNote />
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {step > 0 && (
              <Button variant="outline" className="border-2 border-ink" onClick={() => setStep(step - 1)}>
                Voltar
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button className="border-2 border-ink" onClick={() => setStep(step + 1)}>
                Continuar
              </Button>
            ) : (
              <Button
                className="border-2 border-ink bg-status-missing text-primary-foreground hover:bg-status-missing/90"
                onClick={submit}
              >
                Publicar ocorrência
              </Button>
            )}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}