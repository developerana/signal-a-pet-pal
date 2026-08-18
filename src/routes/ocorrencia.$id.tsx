import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Eye, Flag, MapPin, MessageCircle, Ruler } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge, statusDot } from "@/components/StatusBadge";
import { ShareDialog } from "@/components/ShareDialog";
import { DemoNote, Panel } from "@/components/FormKit";
import { Button } from "@/components/ui/button";
import { demoOccurrences } from "@/data/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ocorrencia/$id")({
  loader: ({ params }) => {
    const occurrence = demoOccurrences.find((o) => o.id === params.id);
    if (!occurrence) throw notFound();
    return { occurrence };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Ocorrência não encontrada — SinalizaPet" }, { name: "robots", content: "noindex" }],
      };
    }
    const o = loaderData.occurrence;
    const title = `${o.name} — ${o.neighborhood}, ${o.city} | SinalizaPet`;
    return {
      meta: [
        { title },
        { name: "description", content: o.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: o.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: OccurrenceNotFound,
  component: OccurrenceDetail,
});

function OccurrenceNotFound() {
  return (
    <AppShell>
      <div className="poster p-8 text-center">
        <h1 className="text-2xl font-extrabold uppercase">Ocorrência não encontrada</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O link pode estar desatualizado ou a ocorrência foi encerrada.
        </p>
        <Button asChild className="mt-6 border-2 border-ink">
          <Link to="/buscar">Voltar para a busca</Link>
        </Button>
      </div>
    </AppShell>
  );
}

function OccurrenceDetail() {
  const { occurrence: o } = Route.useLoaderData();

  const facts = [
    { label: "Espécie", value: o.species },
    { label: "Raça", value: o.breed ?? "—" },
    { label: "Sexo", value: o.sex ?? "—" },
    { label: "Idade", value: o.age ?? "—" },
    { label: "Porte", value: o.size ?? "—" },
    { label: "Cor", value: o.color ?? "—" },
  ];

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div className="grid gap-6">
          <article className="poster overflow-hidden">
            <div className="relative aspect-[4/3] w-full border-b-2 border-ink bg-secondary">
              <img
                src={o.photoUrl}
                alt={`${o.name}, ${o.species} — ${o.summary}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3">
                <StatusBadge status={o.status} />
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="eyebrow text-muted-foreground">Ocorrência #{o.id}</p>
              <h1 className="mt-2 text-3xl font-black uppercase leading-none sm:text-4xl">{o.name}</h1>
              <p className="mt-3 text-foreground/80">{o.description}</p>

              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label} className="border-2 border-ink bg-secondary px-3 py-2">
                    <dt className="eyebrow text-muted-foreground">{f.label}</dt>
                    <dd className="text-sm font-semibold capitalize">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-6 grid gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" /> {o.neighborhood}, {o.city}
                  {o.reference ? ` — ${o.reference}` : ""}
                </li>
                <li className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 shrink-0" /> aproximadamente {o.distanceKm} km de você
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" /> {o.date}
                  {o.time ? ` às ${o.time}` : ""}
                </li>
              </ul>
            </div>
          </article>

          <Panel title={`Avistamentos (${o.sightings.length})`}>
            {o.sightings.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum avistamento sinalizado até agora. Se você viu esse animal, sinalize.
              </p>
            ) : (
              <ul className="grid gap-3">
                {o.sightings.map((s) => (
                  <li key={s.id} className="border-2 border-ink bg-secondary p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="eyebrow border-2 border-ink bg-status-sighted px-2 py-0.5 text-primary">
                        {s.date} · {s.time}
                      </span>
                      <span className="text-sm font-semibold">{s.neighborhood}</span>
                    </div>
                    <p className="mt-2 text-sm text-foreground/80">{s.description}</p>
                    {s.behavior && (
                      <p className="mt-1 text-xs text-muted-foreground">Comportamento: {s.behavior}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Linha do tempo">
            <ol className="relative grid gap-5 border-l-2 border-ink pl-5">
              {o.timeline.map((t) => (
                <li key={t.id} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[1.6rem] top-1 h-3 w-3 border-2 border-ink",
                      t.kind === "avistamento"
                        ? "bg-status-sighted"
                        : t.kind === "status"
                          ? "bg-status-reunited"
                          : "bg-paper",
                    )}
                  />
                  <p className="eyebrow text-muted-foreground">
                    {t.date} · {t.time}
                  </p>
                  <p className="mt-1 text-sm">{t.text}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <Panel title="Ajude nesta busca">
            <div className="grid gap-3">
              <Button
                asChild
                size="lg"
                className="border-2 border-ink bg-status-sighted text-primary hover:bg-status-sighted/80"
              >
                <Link to="/novo-avistamento" search={{ ocorrencia: o.id }}>
                  <Eye className="h-5 w-5" /> Eu vi este animal
                </Link>
              </Button>
              <ShareDialog occurrence={o} />
              <Button variant="outline" className="border-2 border-ink">
                <MessageCircle className="h-4 w-4" /> Falar com o tutor
              </Button>
              <Button variant="ghost" className="justify-start text-muted-foreground">
                <Flag className="h-4 w-4" /> Denunciar informação
              </Button>
              <DemoNote>Contato mediado pela plataforma na versão final.</DemoNote>
            </div>
          </Panel>

          <Panel title="Região aproximada">
            <div className="relative h-48 border-2 border-ink bg-secondary sand-grid">
              <span
                className={cn(
                  "absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink",
                  statusDot[o.status],
                )}
                style={{ left: `${o.map.x}%`, top: `${o.map.y}%` }}
                aria-hidden
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Exibimos apenas bairro e raio aproximado, nunca o endereço exato.
            </p>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}