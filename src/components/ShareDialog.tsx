import { useState } from "react";
import { Copy, Facebook, Instagram, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import type { Occurrence } from "@/types";

/**
 * Estrutura de compartilhamento. WhatsApp e Facebook usam links públicos.
 * Instagram não possui API de compartilhamento web: por isso a opção
 * copia o texto para publicação manual (a integração pode ser adicionada depois).
 */
export function ShareDialog({
  occurrence,
  trigger,
}: {
  occurrence: Occurrence;
  trigger?: React.ReactNode;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const link =
    typeof window !== "undefined"
      ? `${window.location.origin}/ocorrencia/${occurrence.id}`
      : `/ocorrencia/${occurrence.id}`;
  const text = `🚨 PET DESAPARECIDO — ${occurrence.name}\n${occurrence.species} • ${occurrence.neighborhood}, ${occurrence.city}\n${link}`;

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied("erro");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" /> Compartilhar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar ocorrência</DialogTitle>
          <DialogDescription>
            Quanto mais pessoas virem, maior a chance de {occurrence.name} voltar para casa.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 rounded-xl border border-border bg-secondary/60 p-3">
          <img
            src={occurrence.photoUrl}
            alt={occurrence.name}
            loading="lazy"
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div className="min-w-0 space-y-1">
            <StatusBadge status={occurrence.status} />
            <p className="truncate font-display text-base font-bold">{occurrence.name}</p>
            <p className="truncate text-xs text-muted-foreground capitalize">
              {occurrence.species} • {occurrence.neighborhood}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline" className="gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(text)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => copy(text, "texto")}>
            <Instagram className="h-4 w-4" /> Instagram
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => copy(link, "link")}>
            <Copy className="h-4 w-4" /> Copiar link
          </Button>
        </div>
        {copied && (
          <p className="text-center text-xs text-muted-foreground">
            {copied === "erro"
              ? "Não foi possível copiar automaticamente."
              : copied === "texto"
                ? "Texto copiado — cole no seu story ou publicação."
                : "Link copiado!"}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
