import { useMemo, useState } from "react";
import { AtSign, Check, X } from "lucide-react";
import { Field } from "@/components/FormKit";
import { Input } from "@/components/ui/input";
import { checkUsername, USERNAME_MAX } from "@/lib/username";
import { cn } from "@/lib/utils";

export function UsernameField({
  defaultValue = "",
  taken = [],
  label = "Username",
  hint = "Seu identificador único na rede. Aparece como @seunome.",
  onChange,
}: {
  defaultValue?: string;
  taken?: readonly string[];
  label?: string;
  hint?: string;
  onChange?: (value: string, valid: boolean) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  const result = useMemo(() => checkUsername(value, taken), [value, taken]);
  const touched = value.trim().length > 0;

  return (
    <Field label={label} hint={hint} required>
      <div className="relative">
        <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          maxLength={USERNAME_MAX + 1}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="seunome"
          className={cn(
            "pl-9 pr-9",
            touched && (result.ok ? "border-status-reunited" : "border-status-missing"),
          )}
          onChange={(e) => {
            const next = e.target.value.replace(/^@+/, "").toLowerCase();
            setValue(next);
            const check = checkUsername(next, taken);
            onChange?.(check.ok ? check.username : next, check.ok);
          }}
        />
        {touched && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {result.ok ? (
              <Check className="h-4 w-4 text-status-reunited" />
            ) : (
              <X className="h-4 w-4 text-status-missing" />
            )}
          </span>
        )}
      </div>
      {touched && (
        <p
          className={cn(
            "mt-1.5 text-xs font-semibold",
            result.ok ? "text-status-reunited" : "text-status-missing",
          )}
        >
          {result.ok ? `@${result.username} está disponível.` : result.error}
        </p>
      )}
    </Field>
  );
}
