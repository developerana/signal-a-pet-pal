import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { DemoNotice } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { demoPets } from "@/data/demo";

export const Route = createFileRoute("/meus-animais")({
  head: () => ({
    meta: [
      { title: "Meus animais — SinalizaPet" },
      { name: "description", content: "Cadastre seus animais para registrar uma ocorrência em segundos." },
      { property: "og:title", content: "Meus animais — SinalizaPet" },
      { property: "og:description", content: "Perfis dos seus pets prontos para uma emergência." },
    ],
  }),
  component: MeusAnimais,
});

function MeusAnimais() {
  return (
    <AppShell>
      <PageHeader
        title="Meus animais"
        description="Com os perfis prontos, cadastrar uma ocorrência leva segundos."
        action={
          <Button asChild className="gap-2">
            <Link to="/nova-ocorrencia">
              <Plus className="h-4 w-4" /> Cadastrar animal
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {demoPets.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <img src={p.photoUrl} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="space-y-1 p-4">
              <h2 className="truncate text-lg font-bold">{p.name}</h2>
              <p className="text-sm capitalize text-muted-foreground">
                {p.species}
                {p.breed ? ` • ${p.breed}` : ""}
                {p.age ? ` • ${p.age}` : ""}
              </p>
              <p className="text-sm text-foreground/80">{p.traits}</p>
              {p.notes && <p className="text-xs text-muted-foreground">Obs.: {p.notes}</p>}
              <Button asChild size="sm" variant="outline" className="mt-3 w-full">
                <Link to="/nova-ocorrencia">Registrar desaparecimento</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4">
        <DemoNotice>Perfis de demonstração. O cadastro real será salvo com o banco de dados conectado.</DemoNotice>
      </div>
    </AppShell>
  );
}
