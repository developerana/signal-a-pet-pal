import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, House, MapPin, Search, Siren } from "lucide-react";
import { BrandCat } from "@/components/BrandCat";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { MapCanvas, MapLegend } from "@/components/MapCanvas";
import { Marquee, SiteLayout } from "@/components/SiteChrome";
import { demoAdminStats, demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SinalizaPet — Viu? Sinaliza. Encontrou? Avisa." },
      {
        name: "description",
        content:
          "Rede comunitária de busca por animais perdidos: abra uma ocorrência, sinalize avistamentos e acompanhe o mapa do seu bairro.",
      },
      { property: "og:title", content: "SinalizaPet — Viu? Sinaliza. Encontrou? Avisa." },
      {
        property: "og:description",
        content:
          "Uma informação pode ser a diferença entre um animal continuar perdido e voltar para casa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const highlights = demoOccurrences.filter((o) => o.status !== "obito").slice(0, 4);

  return (
    <SiteLayout>
      <Marquee
        items={[
          "Projeto em construção",
          "Viu? Sinaliza. Encontrou? Avisa.",
          "Projeto em construção",
          "Viu? Sinaliza. Encontrou? Avisa.",
        ]}
      />

      {/* HERO */}
      <section className="border-b-2 border-ink bg-accent/50">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="absolute inset-0 sand-grid opacity-50" aria-hidden />
          <div className="relative max-w-2xl">
            <span className="overline inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5">
              <span className="h-2 w-2 bg-status-missing" /> Mural comunitário de busca
            </span>
            <h1 className="mt-4 text-[2.75rem] font-black uppercase leading-[0.9] sm:text-6xl">
              Um animal
              <br />
              perdido
              <br />
              <span className="bg-ink px-2 text-primary-foreground">volta pra casa</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-foreground/80">
              O SinalizaPet transforma informação solta em pista útil: cada avistamento entra na linha
              do tempo da ocorrência e avisa o tutor na hora.
            </p>

            <div className="mt-7 border-2 border-ink bg-paper p-4 shadow-soft">
              <p className="overline border-b-2 border-ink pb-2">O que você precisa fazer?</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-16 flex-col items-start justify-center gap-1.5 whitespace-normal border-2 border-ink bg-status-missing px-3 py-3 text-left leading-tight text-primary-foreground hover:bg-status-missing/90"
              >
                <Link to="/nova-ocorrencia">
                  <Siren className="h-5 w-5 shrink-0" /> Meu pet desapareceu
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto min-h-16 flex-col items-start justify-center gap-1.5 whitespace-normal border-2 border-ink bg-status-sighted px-3 py-3 text-left leading-tight text-primary hover:bg-status-sighted/80"
              >
                <Link to="/novo-avistamento" search={{ ocorrencia: undefined }}>
                  <Eye className="h-5 w-5 shrink-0" /> Eu vi um animal
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto min-h-16 flex-col items-start justify-center gap-1.5 whitespace-normal border-2 border-ink bg-status-found px-3 py-3 text-left leading-tight text-primary-foreground hover:bg-status-found/90"
              >
                <Link to="/animal-encontrado">
                  <House className="h-5 w-5 shrink-0" /> Encontrei um animal
                </Link>
              </Button>
              </div>

              <Link
                to="/buscar"
                className="mt-3 flex items-center gap-2 border-2 border-ink bg-secondary px-4 py-3 text-sm text-muted-foreground"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span className="truncate">Procure por um animal, bairro ou região...</span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="poster p-8">
              <p className="overline border-b-2 border-ink pb-2 text-center">Procura-se</p>
              <BrandCat className="mx-auto mt-6 h-56 w-auto" />
              <p className="mt-6 text-center font-display text-lg font-extrabold uppercase leading-tight">
                Juntos, um pet volta pra casa
              </p>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                O gato preto é uma homenagem ao Logan, origem deste projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="border-b-2 border-ink bg-ink text-primary-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {[
            { label: "Ocorrências ativas", value: demoAdminStats.activeOccurrences },
            { label: "Sinalizações", value: demoAdminStats.sightings },
            { label: "Reencontros", value: demoAdminStats.reunited },
            { label: "Pessoas na rede", value: demoAdminStats.users },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-black leading-none">{s.value}</p>
              <p className="overline mt-2 text-primary-foreground/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-extrabold uppercase leading-none sm:text-4xl">
          Três passos, nada de burocracia
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              icon: Siren,
              title: "Sinalize em minutos",
              text: "Formulário curto, feito para o celular e para momentos de estresse.",
            },
            {
              n: "02",
              icon: MapPin,
              title: "Localização aproximada",
              text: "Ocorrências aparecem por bairro e raio, nunca no endereço exato.",
            },
            {
              n: "03",
              icon: Eye,
              title: "A rede responde",
              text: "Cada avistamento entra na linha do tempo e notifica o tutor na hora.",
            },
          ].map((f) => (
            <div key={f.title} className="poster p-5">
              <div className="flex items-center justify-between">
                <f.icon className="h-6 w-6" />
                <span className="font-display text-3xl font-black text-ink/15">{f.n}</span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold uppercase leading-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
        <Button asChild variant="ghost" className="mt-6 gap-2">
          <Link to="/como-funciona">
            Ver o passo a passo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* MURAL */}
      <section className="border-y-2 border-ink bg-secondary py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
            <h2 className="truncate text-3xl font-extrabold uppercase leading-none sm:text-4xl">
              Mural recente
            </h2>
            <Button asChild variant="outline" size="sm" className="gap-1 border-2 border-ink">
              <Link to="/buscar">
                Ver todas <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((o) => (
              <OccurrenceCard key={o.id} occurrence={o} />
            ))}
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-extrabold uppercase leading-none sm:text-4xl">
          O que está acontecendo por perto
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Marcadores por status, sempre em localização aproximada.
        </p>
        <div className="mt-6">
          <MapCanvas occurrences={demoOccurrences} className="h-[380px]" />
          <div className="mt-4">
            <MapLegend />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-ink bg-status-missing text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-black uppercase leading-none sm:text-4xl">
              Viu um animal na rua?
            </h2>
            <p className="mt-2 text-primary-foreground/85">
              Leva menos de dois minutos e pode encerrar uma busca de semanas.
            </p>
          </div>
          <Button asChild size="lg" className="border-2 border-ink bg-paper text-ink hover:bg-paper/90">
            <Link to="/novo-avistamento" search={{ ocorrencia: undefined }}>
              Sinalizar agora
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}