import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { demoOccurrences } from "@/data/demo";
import type { OccurrenceStatus, Species } from "@/types";

export const Route = createFileRoute("/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar animais e ocorrências — SinalizaPet" },
      { name: "description", content: "Procure por um animal, bairro ou região e filtre por espécie, status e distância." },
      { property: "og:title", content: "Buscar animais e ocorrências — SinalizaPet" },
      { property: "og:description", content: "Filtre ocorrências por espécie, status, região e raio de distância." },
    ],
  }),
  component: BuscarPage,
});

function BuscarPage() {
  const [term, setTerm] = useState("");
  const [species, setSpecies] = useState<Species | "todos">("todos");
  const [status, setStatus] = useState<OccurrenceStatus | "todos">("todos");
  const [neighborhood, setNeighborhood] = useState("todos");
  const [radius, setRadius] = useState([10]);
  const [sort, setSort] = useState("recentes");

  const neighborhoods = useMemo(
    () => Array.from(new Set(demoOccurrences.map((o) => o.neighborhood))),
    [],
  );

  const results = useMemo(() => {
    const t = term.trim().toLowerCase();
    const maxKm = radius[0] ?? 20;
    const list = demoOccurrences.filter((o) => {
      const matchTerm =
        !t ||
        o.name.toLowerCase().includes(t) ||
        o.neighborhood.toLowerCase().includes(t) ||
        o.city.toLowerCase().includes(t) ||
        o.summary.toLowerCase().includes(t);
      const matchSpecies = species === "todos" || o.species === species;
      const matchStatus = status === "todos" || o.status === status;
      const matchNeighborhood = neighborhood === "todos" || o.neighborhood === neighborhood;
      return matchTerm && matchSpecies && matchStatus && matchNeighborhood && o.distanceKm <= maxKm;
    });
    if (sort === "proximos") return [...list].sort((a, b) => a.distanceKm - b.distanceKm);
    if (sort === "avistados") return [...list].sort((a, b) => b.sightingsCount - a.sightingsCount);
    return list;
  }, [term, species, status, neighborhood, radius, sort]);

  return (
    <AppShell>
      <PageHeader title="Buscar" description="Encontre ocorrências por animal, bairro ou região." />

      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Procure por um animal, bairro ou região..."
            className="h-12 pl-9"
            aria-label="Buscar"
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={species} onValueChange={(v) => setSpecies(v as Species | "todos")}>
            <SelectTrigger aria-label="Espécie"><SelectValue placeholder="Espécie" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas as espécies</SelectItem>
              <SelectItem value="cachorro">Cachorro</SelectItem>
              <SelectItem value="gato">Gato</SelectItem>
              <SelectItem value="ave">Ave</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={(v) => setStatus(v as OccurrenceStatus | "todos")}>
            <SelectTrigger aria-label="Status"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="desaparecido">Desaparecido</SelectItem>
              <SelectItem value="avistado">Avistado</SelectItem>
              <SelectItem value="encontrado">Encontrado</SelectItem>
              <SelectItem value="reencontrado">Reencontrado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={neighborhood} onValueChange={setNeighborhood}>
            <SelectTrigger aria-label="Bairro"><SelectValue placeholder="Bairro" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os bairros</SelectItem>
              {neighborhoods.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger aria-label="Ordenação"><SelectValue placeholder="Ordenar" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais recentes</SelectItem>
              <SelectItem value="proximos">Mais próximos</SelectItem>
              <SelectItem value="avistados">Mais avistados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Raio de distância</span>
            <span className="text-muted-foreground">até {radius[0]} km</span>
          </div>
          <Slider value={radius} onValueChange={setRadius} min={1} max={20} step={1} className="mt-3" />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {results.length} ocorrência{results.length === 1 ? "" : "s"} encontrada
        {results.length === 1 ? "" : "s"}
      </p>

      <div className="mt-3 grid gap-4">
        {results.map((o) => (
          <OccurrenceCard key={o.id} occurrence={o} />
        ))}
        {results.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-display text-lg font-bold">Nada encontrado por aqui</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente aumentar o raio de distância ou remover alguns filtros.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => {
                setTerm("");
                setSpecies("todos");
                setStatus("todos");
                setNeighborhood("todos");
                setRadius([20]);
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
