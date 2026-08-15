import { useState } from "react";
import { Check, Copy, Facebook, Instagram, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Occurrence } from "@/types";

export function ShareDialog({
  occurrence,
  trigger,
}: {
  occurrence: Occurrence;
  trigger?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/ocorrencia/${occurrence.id}`
      : `/ocorrencia/${occurrence.id}`;
  const text = `${occurrence.name} — ${occurrence.summary} (${occurrence.neighborhood}, ${occurrence.city})`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      toast.success("Link copiado");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Não foi possível copiar o link");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" /> Compartilhar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="border-2 border-ink">
        <DialogHeader>
          <DialogTitle>Compartilhar cartaz</DialogTitle>
          <DialogDescription>
            Quanto mais gente vê, maior a chance de alguém reconhecer o animal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Button asChild variant="outline" className="justify-start gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="justify-start gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </Button>
          <Button variant="outline" className="justify-start gap-2" onClick={copy}>
            <Instagram className="h-4 w-4" /> Instagram (copiar legenda)
          </Button>
          <Button className="justify-start gap-2" onClick={copy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copiar link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}