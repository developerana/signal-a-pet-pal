import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, BrandIcon, PageHeader } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoOccurrences, demoPets, demoUser } from "@/data/demo";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — SinalizaPet" },
      { name: "description", content: "Seus animais, ocorrências, avistamentos e favoritos." },
      { property: "og:title", content: "Meu perfil — SinalizaPet" },
      { property: "og:description", content: "Acompanhe sua participação na rede comunitária." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const mine = demoOccurrences.slice(0, 3);
  const favorites = demoOccurrences.slice(3, 5);

  return (
    <AppShell>
      <PageHeader title="Meu perfil" />

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent">
            <BrandIcon className="h-9 w-9" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold">{demoUser.name}</h2>
            <p className="truncate text-sm text-muted-foreground">
              {demoUser.city} • na comunidade desde {demoUser.memberSince}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Animais cadastrados", demoPets.length],
            ["Ocorrências criadas", mine.length],
            ["Avistamentos realizados", demoUser.signals],
            ["Favoritos", favorites.length],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-xl bg-secondary/60 p-3">
              <p className="font-display text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-accent/40 p-4">
          <p className="font-display font-bold">🐾 {demoUser.signals} sinalizações realizadas</p>
          <p className="text-sm text-muted-foreground">
            Informações que ajudaram outros tutores na busca. Obrigada por colaborar.
          </p>
        </div>
      </div>

      <Tabs defaultValue="ocorrencias" className="mt-6">
        <TabsList>
          <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
          <TabsTrigger value="animais">Animais</TabsTrigger>
          <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
        </TabsList>

        <TabsContent value="ocorrencias" className="mt-4 grid gap-3">
          {mine.map((o) => (
            <ProfileRow key={o.id} id={o.id} name={o.name} photo={o.photoUrl} sub={`${o.neighborhood} • ${o.date}`} status={o.status} />
          ))}
        </TabsContent>

        <TabsContent value="animais" className="mt-4 grid gap-3">
          {demoPets.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <img src={p.photoUrl} alt={p.name} loading="lazy" className="h-14 w-14 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="truncate font-bold">{p.name}</p>
                <p className="truncate text-sm capitalize text-muted-foreground">{p.species} • {p.traits}</p>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="favoritos" className="mt-4 grid gap-3">
          {favorites.map((o) => (
            <ProfileRow key={o.id} id={o.id} name={o.name} photo={o.photoUrl} sub={`${o.neighborhood} • ${o.date}`} status={o.status} />
          ))}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function ProfileRow({
  id,
  name,
  photo,
  sub,
  status,
}: {
  id: string;
  name: string;
  photo: string;
  sub: string;
  status: Parameters<typeof StatusBadge>[0]["status"];
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
      <img src={photo} alt={name} loading="lazy" className="h-14 w-14 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold">{name}</p>
        <p className="truncate text-sm text-muted-foreground">{sub}</p>
      </div>
      <StatusBadge status={status} />
      <Button asChild size="sm" variant="ghost">
        <Link to="/ocorrencia/$id" params={{ id }}>Abrir</Link>
      </Button>
    </div>
  );
}
