import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, House, MapPin, Search, Siren } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { MapCanvas, MapLegend } from "@/components/MapCanvas";
import { demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SinalizaPet — Viu? Sinaliza. Encontrou? Avisa." },
      {
        name: "description",
        content:
          "Plataforma comunitária para ajudar animais perdidos a encontrarem o caminho de volta para casa.",
      },
      { property: "og:title", content: "SinalizaPet — Viu? Sinaliza. Encontrou? Avisa." },
      {
        property: "og:description",
        content: "Cadastre um desaparecimento, sinalize um avistamento e ajude um pet a voltar para casa.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const highlights = demoOccurrences.filter((o) => o.status !== "obito").slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="min-w-0">
            <img src={BRAND.logoUrl} alt={`${BRAND.name} — ${BRAND.slogan}`} className="h-8 w-auto" />
          </Link>
          <nav className="flex shrink-0 items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/buscar">Buscar</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/cadastro">Criar conta</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border bg-accent/40">
        <div className="absolute inset-0 sand-grid opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-status-missing" /> Rede comunitária de busca
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl">
              SinalizaPet
            </h1>
            <p className="mt-3 font-display text-xl font-semibold sm:text-2xl">{BRAND.slogan}</p>
            <p className="mt-4 max-w-xl text-base text-foreground/75 sm:text-lg">
              Uma plataforma comunitária para ajudar animais perdidos a encontrarem o caminho de volta
              para casa. Uma informação pode ser a diferença entre um animal continuar perdido e voltar
              para casa.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Button asChild size="lg" className="h-14 justify-start gap-3 bg-status-missing text-primary-foreground hover:bg-status-missing/90">
                <Link to="/nova-ocorrencia">
                  <Siren className="h-5 w-5" /> Meu pet desapareceu
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 justify-start gap-3 border-status-sighted bg-status-sighted/15 hover:bg-status-sighted/25">
                <Link to="/novo-avistamento">
                  <Eye className="h-5 w-5" /> Eu vi um animal
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 justify-start gap-3 border-status-found bg-status-found/10 hover:bg-status-found/20">
                <Link to="/animal-encontrado">
                  <House className="h-5 w-5" /> Encontrei um animal
                </Link>
              </Button>
            </div>

            <Link
              to="/buscar"
              className="mt-6 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm text-muted-foreground shadow-soft"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="truncate">Procure por um animal, bairro ou região...</span>
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="rounded-[2rem] border border-border bg-background p-8 shadow-lift">
              <img
                src={BRAND.iconUrl}
                alt="Ícone do gato preto, símbolo do SinalizaPet"
                width={512}
                height={512}
                className="mx-auto h-44 w-44 object-contain"
              />
              <p className="mt-6 text-center font-display text-lg font-bold">
                Juntos, podemos ajudar um pet a voltar para casa.
              </p>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                O gato preto é uma homenagem ao Logan, origem deste projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Siren, title: "Sinalize em minutos", text: "Formulário curto, feito para o celular e para momentos de estresse." },
            { icon: MapPin, title: "Localização aproximada", text: "Ocorrências aparecem por bairro e raio, nunca no endereço exato." },
            { icon: Eye, title: "Avistamentos que ajudam", text: "Cada sinalização entra na linha do tempo e notifica o tutor." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <f.icon className="h-5 w-5" />
              <h3 className="mt-3 text-base font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <h2 className="truncate text-2xl font-bold">Ocorrências recentes</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link to="/buscar">
                Ver todas <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {highlights.map((o) => (
              <OccurrenceCard key={o.id} occurrence={o} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold">Ocorrências no mapa</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Veja o que está acontecendo por perto. Marcadores por status, sempre em localização aproximada.
        </p>
        <div className="mt-4">
          <MapCanvas occurrences={demoOccurrences} className="h-[380px]" />
          <div className="mt-3">
            <MapLegend />
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:px-6">
          <img src={BRAND.logoUrl} alt={BRAND.name} className="h-7 w-auto self-start" />
          <p className="text-sm text-muted-foreground">
            {BRAND.slogan} — dados de demonstração nesta versão inicial.
          </p>
        </div>
      </footer>
    </div>
  );
}
