import { createFileRoute, Link } from "@tanstack/react-router";
import loganSobre from "@/assets/logan-sobre.jpg.asset.json";
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
            <p className="eyebrow text-primary-foreground/60">Sobre</p>
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
            <img
              src={loganSobre.url}
              alt="Logan, o gato preto que inspirou o SinalizaPet"
              className="mx-auto aspect-square w-full object-cover"
            />
            <p className="mt-4 text-center text-sm font-semibold text-ink">
              Em homenagem ao Logan
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">Sobre o Sinaliza Pet</h2>
          <div className="mt-5 grid gap-4 text-base leading-relaxed text-foreground/85">
            <p>
              O Sinaliza Pet nasceu de uma história que começou com a perda de um companheiro muito
              especial. No dia 19 de maio de 2025, o Logan, um gatinho preto que fazia parte da nossa
              família desde março de 2021, desapareceu. Durante sete dias, fizemos o que estava ao nosso
              alcance para encontrá-lo: procuramos, publicamos nas redes sociais, compartilhamos sua foto,
              pedimos ajuda e tentamos alcançar o maior número possível de pessoas. No dia 26 de maio,
              finalmente encontramos o Logan, mas infelizmente já sem vida. Essa experiência deixou não
              apenas a dor da perda, mas também uma reflexão sobre como poderia ser mais fácil organizar
              e ampliar uma busca quando um animal desaparece.
            </p>
            <p>
              Sed tortor nisi, dignissim iaculis pulvinar nec, suscipit venenatis felis. Donec ac
              erat non libero suscipit mollis. In viverra non quam ut eleifend. Aenean sed porttitor
              orci. Praesent gravida velit sit amet elit congue pulvinar. Donec tempor tempus ipsum,
              sit amet malesuada nisl suscipit vitae. Cras quam lorem, pharetra vel pulvinar gravida,
              facilisis in felis. Proin sed dapibus turpis. Aenean maximus vulputate nisl, a finibus
              massa molestie sed. Donec lobortis mollis nisl sit amet posuere. Ut varius diam et
              auctor luctus.
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