import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Home,
  LayoutDashboard,
  Map,
  PawPrint,
  Plus,
  Search,
  Shield,
  User,
  Eye,
  House,
  Siren,
  ListChecks,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { demoNotifications, demoUser } from "@/data/demo";

const sidebarItems = [
  { to: "/dashboard", label: "Início", icon: LayoutDashboard },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/minhas-ocorrencias", label: "Minhas ocorrências", icon: ListChecks },
  { to: "/meus-animais", label: "Meus animais", icon: PawPrint },
  { to: "/notificacoes", label: "Notificações", icon: Bell },
  { to: "/perfil", label: "Perfil", icon: User },
  { to: "/admin", label: "Administração", icon: Shield },
] as const;

const bottomItems = [
  { to: "/dashboard", label: "Início", icon: Home },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center", className)} aria-label={BRAND.name}>
      <img src={BRAND.logoUrl} alt={`${BRAND.name} — ${BRAND.slogan}`} className="h-8 w-auto" />
    </Link>
  );
}

export function BrandIcon({ className }: { className?: string }) {
  return <img src={BRAND.iconUrl} alt="" className={cn("h-6 w-6 object-contain", className)} />;
}

export function QuickActions({ onNavigate }: { onNavigate?: () => void }) {
  const actions = [
    { to: "/nova-ocorrencia", label: "Meu pet desapareceu", hint: "Cadastrar desaparecimento", icon: Siren, tone: "bg-status-missing text-primary-foreground" },
    { to: "/novo-avistamento", label: "Eu vi um animal", hint: "Sinalizar avistamento", icon: Eye, tone: "bg-status-sighted text-primary" },
    { to: "/animal-encontrado", label: "Encontrei um animal", hint: "Cadastrar animal encontrado", icon: House, tone: "bg-status-found text-primary-foreground" },
  ] as const;
  return (
    <div className="grid gap-3">
      {actions.map((a) => (
        <Link
          key={a.to}
          to={a.to}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-soft transition-shadow hover:shadow-lift"
        >
          <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", a.tone)}>
            <a.icon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display font-bold">{a.label}</span>
            <span className="block truncate text-xs text-muted-foreground">{a.hint}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = demoNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <BrandLogo />
            <Link
              to="/buscar"
              className="hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm text-muted-foreground sm:flex"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="truncate">Procure por um animal, bairro ou região...</span>
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="Notificações" className="relative">
              <Link to="/notificacoes">
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-status-missing" />
                )}
              </Link>
            </Button>
            <Link
              to="/perfil"
              aria-label="Perfil"
              className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-border bg-accent"
            >
              <BrandIcon className="h-5 w-5" />
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu" className="lg:hidden">
                  <span className="i">☰</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <BrandIcon /> Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="grid gap-1 px-4">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-secondary"
                    >
                      <item.icon className="h-4 w-4" /> {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 pb-28 pt-6 sm:px-6 lg:pb-12">
        <aside className="hidden w-60 shrink-0 lg:block">
          <nav className="sticky top-24 grid gap-1">
            {sidebarItems.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary",
                  )}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
            <div className="mt-4 rounded-2xl border border-border bg-card p-4">
              <p className="font-display text-sm font-bold">🐾 {demoUser.signals} sinalizações</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Suas informações já ajudaram outros tutores.
              </p>
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 items-end px-2 pb-2 pt-1.5">
          {bottomItems.slice(0, 2).map((item) => (
            <BottomLink key={item.to} {...item} active={pathname === item.to} />
          ))}
          <div className="flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Sinalizar"
                  className="-mt-6 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift"
                >
                  <Plus className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle>O que você quer sinalizar?</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-8">
                  <QuickActions />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {bottomItems.slice(2).map((item) => (
            <BottomLink key={item.to} {...item} active={pathname === item.to} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function BottomLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium",
        active ? "text-foreground" : "text-muted-foreground",
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
