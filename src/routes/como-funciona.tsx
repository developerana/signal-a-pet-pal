import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, House, ShieldCheck, Siren } from "lucide-react";
import { SiteLayout } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Como funciona — SinalizaPet" },
      {
        name: "description",
        content:
          "Entenda como abrir uma ocorrência, sinalizar um avistamento e acompanhar a busca de um animal perdido no SinalizaPet.",
      },
      { property: "og:title", content: "Como funciona o SinalizaPet" },
      {
        property: "og:description",
        content: "Do cadastro da ocorrência ao reencontro: o fluxo completo da rede comunitária.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

const flows = [
  {
    icon: Siren,
    tone: "bg-status-missing text-primary-foreground",
    title: "Meu pet desapareceu",
    steps: [
      "Cadastre o animal com fotos, características e a região aproximada.",
      "A ocorrência entra no mural e no mapa do bairro.",
      "Cada avistamento chega como notificação e entra na linha do tempo.",
      "Ao reencontrar, marque a ocorrência como reencontrada.",
    ],
    to: "/nova-ocorrencia" as const,
  },
  {
    icon: Eye,
    tone: "bg-status-sighted text-primary",
    title: "Eu vi um animal",
    steps: [
      "Descreva onde, quando e como o animal estava.",
      "Se possível, envie uma foto — ela ajuda no reconhecimento.",
      "A sinalização é vinculada a uma ocorrência parecida.",
      "O tutor é avisado na hora, sem expor seus dados.",
    ],
    to: "/novo-avistamento" as const,
  },
  {
    icon: House,
    tone: "bg-status-found text-primary-foreground",
    title: "Encontrei um animal",
    steps: [
      "Registre o animal que está sob seus cuidados temporários.",
      "Informe o estado de saúde e a região onde foi encontrado.",
      "A plataforma cruza com as ocorrências de desaparecimento.",
      "O contato acontece sempre mediado pela plataforma.",
    ],
    to: "/animal-encontrado" as const,
  },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <section className="border-b-2 border-ink bg-accent/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="overline">Passo a passo</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black uppercase leading-[0.9] sm:text-6xl">
            Como funciona o SinalizaPet
          </h1>
          <p className="mt-4 max-w-xl text-foreground/80">
            Três fluxos simples, pensados para o celular e para momentos de pressa.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3">
        {flows.map((f) => (
          <article key={f.title} className="poster flex flex-col p-5">
            <span className={`grid h-11 w-11 place-items-center border-2 border-ink ${f.tone}`}>
              <f.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-xl font-extrabold uppercase leading-tight">{f.title}</h2>
            <ol className="mt-4 grid flex-1 gap-3">
              {f.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm">
                  <span className="overline shrink-0 border-2 border-ink px-1.5 py-0.5 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground/80">{s}</span>
                </li>
              ))}
            </ol>
            <Button asChild className="mt-6 border-2 border-ink">
              <Link to={f.to}>Começar</Link>
            </Button>
          </article>
        ))}
      </section>

      <section className="border-t-2 border-ink bg-secondary py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <ShieldCheck className="h-7 w-7" />
            <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight">
              Privacidade por padrão
            </h2>
          </div>
          <ul className="grid gap-3 text-sm text-foreground/80">
            <li className="poster p-4">
              Nenhum endereço exato é exibido: ocorrências aparecem por bairro e raio aproximado.
            </li>
            <li className="poster p-4">
              O contato entre tutor e quem sinalizou é mediado pela plataforma.
            </li>
            <li className="poster p-4">
              Denúncias de informação falsa são revisadas pela moderação.
            </li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}