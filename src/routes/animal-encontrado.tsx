import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNotice, Field, FormCard, PhotoPicker } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/animal-encontrado")({
  head: () => ({
    meta: [
      { title: "Encontrei um animal — SinalizaPet" },
      { name: "description", content: "Cadastre um animal encontrado e ajude o tutor a localizá-lo." },
      { property: "og:title", content: "Encontrei um animal — SinalizaPet" },
      { property: "og:description", content: "Registre as informações do animal encontrado em poucos passos." },
    ],
  }),
  component: AnimalEncontrado,
});

function AnimalEncontrado() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <AppShell>
        <FormCard className="mx-auto max-w-lg text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-status-found text-primary-foreground">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Obrigada por ajudar!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            O registro será publicado quando o banco de dados estiver conectado. Tutores da região serão
            avisados automaticamente.
          </p>
          <Button asChild className="mt-6">
            <Link to="/buscar">Ver ocorrências da região</Link>
          </Button>
        </FormCard>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <PageHeader
          title="Você encontrou um animal?"
          description="Cadastre as informações para ajudar o tutor a encontrá-lo."
        />
        <FormCard className="space-y-5">
          <PhotoPicker label="Foto do animal" hint="Mesmo uma foto simples ajuda o tutor a reconhecer." />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Espécie">
              <Select defaultValue="cachorro">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cachorro">Cachorro</SelectItem>
                  <SelectItem value="gato">Gato</SelectItem>
                  <SelectItem value="ave">Ave</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Situação atual do animal">
              <Select defaultValue="comigo">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="comigo">Está comigo em segurança</SelectItem>
                  <SelectItem value="local">Continua no local</SelectItem>
                  <SelectItem value="clinica">Levado a uma clínica</SelectItem>
                  <SelectItem value="ong">Entregue a uma ONG</SelectItem>
                  <SelectItem value="ferido">Precisa de ajuda urgente</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Cidade" htmlFor="cidade"><Input id="cidade" /></Field>
            <Field label="Bairro (localização aproximada)" htmlFor="bairro"><Input id="bairro" /></Field>
            <Field label="Data" htmlFor="data"><Input id="data" type="date" /></Field>
            <Field label="Horário" htmlFor="hora"><Input id="hora" type="time" /></Field>
          </div>
          <Field label="Características" htmlFor="carac" hint="Cor, porte, coleira, marcas.">
            <Textarea id="carac" rows={3} />
          </Field>
          <Field label="Descrição" htmlFor="desc">
            <Textarea id="desc" rows={4} placeholder="Onde e como você encontrou o animal." />
          </Field>
          <DemoNotice>
            Demonstração: o cadastro será salvo quando o banco de dados e o armazenamento de imagens
            estiverem conectados.
          </DemoNotice>
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              setSent(true);
              toast.success("Registro concluído!", { description: "Sua ajuda pode reunir um pet à família." });
            }}
          >
            Publicar animal encontrado
          </Button>
        </FormCard>
      </div>
    </AppShell>
  );
}
