import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/BrandMark";
import { BRAND } from "@/lib/brand";
import { SiteLayout } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto — SinalizaPet" },
      {
        name: "description",
        content:
          "A história do SinalizaPet: uma rede comunitária criada a partir da busca por Logan, um gato preto que inspirou a plataforma.",
      },
      { property: "og:title", content: "Sobre o SinalizaPet" },
      {
        property: "og:description",
        content: "Nasceu de uma busca real. Virou uma rede de informação útil para animais perdidos.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="border-b-2 border-ink bg-ink text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="overline text-primary-foreground/60">Sobre</p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-[0.9] sm:text-6xl">
              Começou com um gato preto
            </h1>
            <p className="mt-5 max-w-xl text-primary-foreground/80">
              O SinalizaPet nasceu da experiência de procurar um animal perdido e perceber o quanto a
              informação se perde: prints em grupos, comentários soltos, avistamentos que ninguém
              consegue confirmar. A ideia é simples — organizar essa informação em um só lugar.
            </p>
          </div>
          <div className="mx-auto w-full max-w-xs border-2 border-ink bg-paper p-6">
            <BrandMark className="mx-auto h-36 w-36" />
            <p className="mt-4 text-center text-sm font-semibold text-ink">
              Em homenagem ao Logan
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Informação organizada",
              text: "Cada ocorrência tem linha do tempo, avistamentos e status claro.",
            },
            {
              title: "Comunidade no centro",
              text: "Quem sinaliza é parte da busca, com reconhecimento no perfil.",
            },
            {
              title: "Respeito às pessoas",
              text: "Localização aproximada, contato mediado e moderação ativa.",
            },
          ].map((c) => (
            <div key={c.title} className="poster p-5">
              <h2 className="text-lg font-extrabold uppercase leading-tight">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="poster mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-extrabold uppercase leading-tight">
            {BRAND.slogan}
          </p>
          <Button asChild size="lg" className="border-2 border-ink">
            <Link to="/cadastro">Entrar na rede</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}