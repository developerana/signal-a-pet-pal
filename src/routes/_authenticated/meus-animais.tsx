import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNote } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { demoPets } from "@/data/demo";

export const Route = createFileRoute("/_authenticated/meus-animais")({
  head: () => ({
    meta: [
      { title: "Meus animais — SinalizaPet" },
      {
        name: "description",
        content:
          "Cadastre seus animais com fotos e características para abrir uma ocorrência em segundos se algo acontecer.",
      },
      { property: "og:title", content: "Meus animais — SinalizaPet" },
      { property: "og:description", content: "Fichas prontas para agilizar qualquer busca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyPets,
});

function MyPets() {
  return (
    <AppShell>
      <PageHeader
        title="Meus animais"
        description="Fichas prontas para abrir uma ocorrência em segundos."
        action={
          <Button className="border-2 border-ink">
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {demoPets.map((p) => (
          <article key={p.id} className="poster overflow-hidden">
            <div className="aspect-[4/3] border-b-2 border-ink bg-secondary">
              <img
                src={p.photoUrl}
                alt={`${p.name}, ${p.species}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-extrabold uppercase leading-tight">{p.name}</h2>
              <p className="eyebrow mt-1 text-muted-foreground">
                {p.species} · {p.breed ?? "SRD"} · {p.age ?? "—"}
              </p>
              <p className="mt-2 text-sm text-foreground/80">{p.traits}</p>
              {p.notes && <p className="mt-1 text-xs text-muted-foreground">{p.notes}</p>}
              <Button asChild variant="outline" size="sm" className="mt-4 w-full border-2 border-ink">
                <Link to="/nova-ocorrencia">Registrar desaparecimento</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 max-w-xl">
        <DemoNote />
      </div>
    </AppShell>
  );
}