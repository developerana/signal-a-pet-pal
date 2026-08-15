import type { ReactNode } from "react";
import { Camera, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("poster p-5 sm:p-6", className)}>
      {(title || action) && (
        <header className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          {title && <h2 className="truncate text-lg font-bold sm:text-xl">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function DemoNote({ children }: { children?: ReactNode }) {
  return (
    <p className="flex items-start gap-2 border-2 border-dashed border-ink/40 bg-secondary px-3 py-2 text-xs text-muted-foreground">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{children ?? "Versão de demonstração: os dados não são salvos ainda."}</span>
    </p>
  );
}

export function Stepper({ steps, current }: { steps: readonly string[]; current: number }) {
  return (
    <ol className="mb-6 flex flex-wrap gap-2">
      {steps.map((step, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <li
            key={step}
            className={cn(
              "eyebrow flex items-center gap-2 border-2 border-ink px-2.5 py-1.5",
              active && "bg-ink text-primary-foreground",
              done && "bg-status-reunited text-primary",
              !active && !done && "bg-paper text-muted-foreground",
            )}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span className="hidden sm:inline">{step}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="eyebrow">
        {label} {required && <span className="text-status-missing">*</span>}
      </span>
      {children}
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function PhotoPicker({ label = "Fotos do animal" }: { label?: string }) {
  return (
    <div className="grid gap-1.5">
      <span className="eyebrow">{label}</span>
      <div className="grid place-items-center gap-2 border-2 border-dashed border-ink/50 bg-secondary px-4 py-8 text-center">
        <Camera className="h-6 w-6" />
        <p className="text-sm font-medium">Toque para adicionar fotos</p>
        <p className="text-xs text-muted-foreground">
          Fotos nítidas do rosto e do corpo aumentam muito a chance de reconhecimento.
        </p>
      </div>
    </div>
  );
}

export function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: string;
}) {
  return (
    <div className="poster p-4">
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p className={cn("mt-1 font-display text-3xl font-extrabold leading-none", tone)}>{value}</p>
    </div>
  );
}