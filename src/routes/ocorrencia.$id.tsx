import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Eye, MapPin, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge, STATUS_META } from "@/components/StatusBadge";
import { ShareDialog } from "@/components/ShareDialog";
import { Button } from "@/components/ui/button";
import { demoOccurrences } from "@/data/demo";

export const Route = createFileRoute("/ocorrencia/$id")({
  loader: ({ params }) => {
    // DEMO: leitura em dados mockados. Trocar por consulta ao banco de dados.
    const occurrence = demoOccurrences.find((o) => o.id === params.id);
    if (!occurrence) throw notFound();
    return { occurrence };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Ocorrência não encontrada — SinalizaPet" }, { name: "robots", content: "noindex" }] };
    }
    const o = loaderData.occurrence;
    const title = `${STATUS_META[o.status].label}: ${o.name} — ${o.neighborhood} | SinalizaPet`;
    return {
      meta: [
        { title },
        { name: "description", content: o.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: o.summary },
      ],
    };
  },
  component: OccurrencePage,
});

function OccurrencePage() {
  const { occurrence: o } = Route.useLoaderData();

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <img
              src={o.photoUrl}
              alt={`${o.name}, ${o.species}`}
              width={768}
              height={768}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="space-y-4 p-5 sm:p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <h1 className="truncate text-3xl font-bold">{o.name}</h1>
                  <p className="mt-1 text-sm capitalize text-muted-foreground">
                    {o.species}
                    {o.breed ? ` • ${o.breed}` : ""}
                    {o.size ? ` • porte ${o.size}` : ""}
                  </p>
                </div>
                <StatusBadge status={o.status} />
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {o.neighborhood}, {o.city} (aprox.)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {o.date}
                  {o.time ? ` às ${o.time}` : ""}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {o.sightingsCount} avistamento
                  {o.sightingsCount === 1 ? "" : "s"}
                </span>
              </div>

              <p className="text-base leading-relaxed text-foreground/85">{o.description}</p>

              <dl className="grid gap-3 rounded-xl bg-secondary/50 p-4 text-sm sm:grid-cols-2">
                {[
                  ["Cor", o.color],
                  ["Sexo", o.sex],
                  ["Idade aproximada", o.age],
                  ["Ponto de referência", o.reference ?? "Não informado"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                    <dd className="font-medium capitalize">{v || "—"}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-2">
                <ShareDialog
                  occurrence={o}
                  trigger={<Button variant="outline">Compartilhar ocorrência</Button>}
                />
                <Button asChild variant="ghost">
                  <Link to="/mapa">Ver no mapa</Link>
                </Button>
              </div>
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
            <h2 className="text-xl font-bold">Linha do tempo</h2>
            <ol className="mt-4 space-y-4">
              {o.timeline.map((t) => (
                <li key={t.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="mt-1 w-px flex-1 bg-border" />
                  </div>
                  <div className="pb-1">
                    <p className="text-xs text-muted-foreground">
                      {t.date} — {t.time}
                    </p>
                    <p className="text-sm font-medium">
                      {t.kind === "avistamento" ? "👀 " : t.kind === "registro" ? "🚨 " : "🔔 "}
                      {t.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
            <h2 className="text-xl font-bold">Avistamentos</h2>
            {o.sightings.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Nenhum avistamento registrado ainda. Se você viu este animal, sinalize — sua informação
                pode ser decisiva.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {o.sightings.map((s) => (
                  <li key={s.id} className="rounded-xl border border-border bg-secondary/40 p-4">
                    <p className="text-xs text-muted-foreground">
                      {s.date} às {s.time} • {s.neighborhood}
                    </p>
                    <p className="mt-1 text-sm">{s.description}</p>
                    {s.behavior && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Comportamento observado: {s.behavior}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border-2 border-status-sighted bg-status-sighted/10 p-5">
            <h2 className="font-display text-lg font-bold">👀 Você viu este animal?</h2>
            <p className="mt-1 text-sm text-foreground/80">
              Mesmo uma informação simples ajuda: horário, rua ou direção que ele seguiu.
            </p>
            <Button asChild size="lg" className="mt-4 w-full">
              <Link to="/novo-avistamento" search={{ ocorrencia: o.id }}>
                Sinalizar avistamento
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-base font-bold">Contato</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {o.contactPreference === "chat"
                ? "O tutor optou por receber mensagens pelo chat da plataforma."
                : o.contactPreference === "whatsapp-mediado"
                  ? "O tutor aceita contato por WhatsApp mediado pela plataforma."
                  : "O tutor aceita contato por e-mail mediado pela plataforma."}
            </p>
            <p className="mt-3 flex gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Dados pessoais nunca são exibidos publicamente. O canal de mensagens será ativado junto com
              a autenticação.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-base font-bold">Localização aproximada</h3>
            <div className="mt-3 h-40 rounded-xl bg-accent/50 sand-grid" aria-hidden />
            <p className="mt-2 text-xs text-muted-foreground">
              Região de {o.neighborhood}. Não exibimos o endereço da residência.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
