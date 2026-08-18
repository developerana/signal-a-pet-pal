import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BrandWordmark } from "@/components/BrandMark";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/buscar", label: "Buscar" },
  { to: "/mapa", label: "Mapa" },
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="min-w-0" aria-label={BRAND.name}>
          <BrandWordmark />
        </Link>
        <nav className="flex shrink-0 items-center gap-1 sm:gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="eyebrow hidden px-2 py-1 hover:bg-secondary md:block"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/cadastro">Criar conta</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-status-sighted text-primary-foreground">
      <div className="marquee-track flex w-max gap-8 py-2">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="eyebrow whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-extrabold uppercase leading-none">{BRAND.name}</p>
          <p className="mt-2 text-sm text-primary-foreground/70">{BRAND.slogan}</p>
          <p className="mt-4 max-w-sm text-xs text-primary-foreground/60">
            Rede comunitária de busca por animais perdidos. Dados de demonstração nesta versão
            inicial.
          </p>
        </div>
        <FooterCol
          title="Plataforma"
          items={[
            { to: "/buscar", label: "Buscar animais" },
            { to: "/mapa", label: "Mapa de ocorrências" },
            { to: "/como-funciona", label: "Como funciona" },
          ]}
        />
        <FooterCol
          title="Sinalizar"
          items={[
            { to: "/nova-ocorrencia", label: "Meu pet desapareceu" },
            { to: "/novo-avistamento", label: "Eu vi um animal" },
            { to: "/animal-encontrado", label: "Encontrei um animal" },
          ]}
        />
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="eyebrow text-primary-foreground/60">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="hover:underline">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background paper-grain">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}