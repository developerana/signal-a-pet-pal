import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNotice, Field, FormCard, PhotoPicker, Stepper } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { demoPets } from "@/data/demo";

export const Route = createFileRoute("/nova-ocorrencia")({
  head: () => ({
    meta: [
      { title: "Cadastrar desaparecimento — SinalizaPet" },
      { name: "description", content: "Registre um animal desaparecido em poucos passos e mobilize a comunidade." },
      { property: "og:title", content: "Cadastrar desaparecimento — SinalizaPet" },
      { property: "og:description", content: "Formulário rápido para registrar um pet desaparecido." },
    ],
  }),
  component: NovaOcorrencia,
});

const steps = ["Animal", "Desaparecimento", "Contato", "Revisão"];

function NovaOcorrencia() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    species: "gato",
    breed: "",
    sex: "indefinido",
    age: "",
    size: "medio",
    color: "",
    traits: "",
    date: "",
    time: "",
    city: "",
    neighborhood: "",
    lastSeen: "",
    reference: "",
    story: "",
    contact: "chat",
  });
  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const [published, setPublished] = useState(false);

  if (published) {
    return (
      <AppShell>
        <FormCard className="mx-auto max-w-lg text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-status-reunited">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Ocorrência pronta para publicação</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Assim que o banco de dados estiver conectado, esta ocorrência será publicada e a comunidade
            da sua região será avisada.
          </p>
          <div className="mt-6 grid gap-2">
            <Button asChild>
              <Link to="/minhas-ocorrencias">Ver minhas ocorrências</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/dashboard">Voltar ao início</Link>
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
          title="Meu pet desapareceu"
          description="Vamos com calma. São poucos campos — o essencial para começar a busca."
        />
        <Stepper steps={steps} current={step} />

        <FormCard className="space-y-5">
          {step === 0 && (
            <>
              <Field label="Qual animal desapareceu?" hint="Você pode selecionar um animal já cadastrado.">
                <Select onValueChange={(v) => { const p = demoPets.find((d) => d.id === v); if (p) { set("name", p.name); set("species", p.species); set("breed", p.breed ?? ""); set("traits", p.traits); } }}>
                  <SelectTrigger><SelectValue placeholder="Selecionar dos meus animais (opcional)" /></SelectTrigger>
                  <SelectContent>
                    {demoPets.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name} • {p.species}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome" htmlFor="name">
                  <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex.: Logan" />
                </Field>
                <Field label="Espécie">
                  <Select value={form.species} onValueChange={(v) => set("species", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cachorro">Cachorro</SelectItem>
                      <SelectItem value="gato">Gato</SelectItem>
                      <SelectItem value="ave">Ave</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Raça" htmlFor="breed">
                  <Input id="breed" value={form.breed} onChange={(e) => set("breed", e.target.value)} placeholder="SRD, se não souber" />
                </Field>
                <Field label="Idade aproximada" htmlFor="age">
                  <Input id="age" value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="Ex.: 3 anos" />
                </Field>
                <Field label="Sexo">
                  <RadioGroup value={form.sex} onValueChange={(v) => set("sex", v)} className="flex gap-4 pt-1">
                    {[["macho", "Macho"], ["femea", "Fêmea"], ["indefinido", "Não sei"]].map(([v, l]) => (
                      <div key={v} className="flex items-center gap-2">
                        <RadioGroupItem value={v} id={`sex-${v}`} />
                        <Label htmlFor={`sex-${v}`} className="text-sm font-normal">{l}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </Field>
                <Field label="Porte">
                  <Select value={form.size} onValueChange={(v) => set("size", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pequeno">Pequeno</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Cor" htmlFor="color" className="sm:col-span-2">
                  <Input id="color" value={form.color} onChange={(e) => set("color", e.target.value)} placeholder="Ex.: preto com marca branca no peito" />
                </Field>
              </div>
              <Field label="Características" htmlFor="traits" hint="Marcas, coleira, comportamento, algo que ajude a reconhecer.">
                <Textarea id="traits" value={form.traits} onChange={(e) => set("traits", e.target.value)} rows={3} />
              </Field>
              <PhotoPicker label="Foto principal" hint="Uma foto nítida do rosto ajuda muito." />
              <PhotoPicker label="Fotos adicionais" />
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Data" htmlFor="date">
                  <Input id="date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
                </Field>
                <Field label="Horário aproximado" htmlFor="time">
                  <Input id="time" type="time" value={form.time} onChange={(e) => set("time", e.target.value)} />
                </Field>
                <Field label="Cidade" htmlFor="city">
                  <Input id="city" value={form.city} onChange={(e) => set("city", e.target.value)} />
                </Field>
                <Field label="Bairro" htmlFor="neighborhood">
                  <Input id="neighborhood" value={form.neighborhood} onChange={(e) => set("neighborhood", e.target.value)} />
                </Field>
              </div>
              <Field label="Último local onde foi visto" htmlFor="lastSeen" hint="Use uma referência aproximada — não informe o endereço exato da sua casa.">
                <Input id="lastSeen" value={form.lastSeen} onChange={(e) => set("lastSeen", e.target.value)} placeholder="Ex.: rua atrás da praça" />
              </Field>
              <Field label="Ponto de referência" htmlFor="reference">
                <Input id="reference" value={form.reference} onChange={(e) => set("reference", e.target.value)} placeholder="Ex.: perto da padaria da esquina" />
              </Field>
              <Field label="Como aconteceu" htmlFor="story">
                <Textarea id="story" value={form.story} onChange={(e) => set("story", e.target.value)} rows={4} placeholder="Conte com suas palavras o que aconteceu." />
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-muted-foreground">
                Seus dados pessoais nunca aparecem na ocorrência. Escolha como quer receber contato de
                quem tiver informações.
              </p>
              <RadioGroup value={form.contact} onValueChange={(v) => set("contact", v)} className="grid gap-3">
                {[
                  ["chat", "Chat da plataforma", "Mais seguro: nenhum dado seu é exposto."],
                  ["whatsapp-mediado", "WhatsApp mediado", "A plataforma intermedia o primeiro contato."],
                  ["email-mediado", "E-mail mediado", "Você recebe as mensagens sem revelar seu e-mail."],
                ].map(([v, title, desc]) => (
                  <label key={v} className="flex cursor-pointer gap-3 rounded-xl border border-border p-4 has-[:checked]:border-primary">
                    <RadioGroupItem value={v} id={`c-${v}`} className="mt-1" />
                    <span>
                      <span className="block font-medium">{title}</span>
                      <span className="block text-xs text-muted-foreground">{desc}</span>
                    </span>
                  </label>
                ))}
              </RadioGroup>
              <DemoNotice>
                O canal de mensagens será ativado junto com a autenticação e o banco de dados.
              </DemoNotice>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-bold">Prévia da ocorrência</h2>
              <div className="rounded-2xl border border-border p-4">
                <StatusBadge status="desaparecido" />
                <p className="mt-2 font-display text-xl font-bold">{form.name || "Sem nome informado"}</p>
                <p className="text-sm capitalize text-muted-foreground">
                  {form.species}
                  {form.breed ? ` • ${form.breed}` : ""} • porte {form.size}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  📍 {form.neighborhood || "Bairro não informado"}
                  {form.city ? `, ${form.city}` : ""} • 🕐 {form.date || "data não informada"}
                </p>
                <p className="mt-2 text-sm">{form.traits || form.story || "Sem descrição."}</p>
              </div>
              <DemoNotice>
                Demonstração: a publicação real acontecerá quando o banco de dados estiver conectado.
              </DemoNotice>
            </>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)} className="gap-2">
                Continuar <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => {
                  setPublished(true);
                  toast.success("Ocorrência revisada!", {
                    description: "Falta apenas conectar o banco de dados para publicar de verdade.",
                  });
                }}
              >
                Publicar ocorrência
              </Button>
            )}
          </div>
        </FormCard>
      </div>
    </AppShell>
  );
}
