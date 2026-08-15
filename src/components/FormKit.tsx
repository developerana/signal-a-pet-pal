import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="mb-6 flex items-center gap-2">
      {steps.map((label, i) => (
        <li key={label} className="flex min-w-0 flex-1 items-center gap-2">
          <span
            className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold",
              i <= current ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            {i + 1}
          </span>
          <span
            className={cn(
              "hidden truncate text-xs font-medium sm:block",
              i === current ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {label}
          </span>
          {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
        </li>
      ))}
    </ol>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** Aviso honesto: o MVP ainda não possui backend conectado. */
export function DemoNotice({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 rounded-xl border border-dashed border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function FormCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6", className)}>
      {children}
    </div>
  );
}

export function PhotoPicker({ label, hint }: { label: string; hint?: string }) {
  return (
    <Field label={label} hint={hint}>
      <label className="grid cursor-pointer place-items-center gap-1 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-8 text-center text-sm text-muted-foreground">
        <input type="file" accept="image/*" className="hidden" />
        <span className="font-medium text-foreground">Escolher foto</span>
        <span className="text-xs">O envio de imagens será ativado com o armazenamento conectado.</span>
      </label>
    </Field>
  );
}
