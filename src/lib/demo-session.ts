import { useCallback, useEffect, useState } from "react";

/**
 * Sessão de demonstração (armazenada no navegador).
 * A landing page é pública; qualquer interação com o interior do sistema
 * pede login ou criação de conta.
 */
const KEY = "sinalizapet.demo.session";
const REDIRECT_KEY = "sinalizapet.demo.redirect";
const EVENT = "sinalizapet:session";

export type DemoSession = { username: string; name?: string };

function read(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function signInDemo(session: DemoSession) {
  window.localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(EVENT));
}

export function signOutDemo() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function setPendingRedirect(path: string) {
  if (typeof window !== "undefined") window.sessionStorage.setItem(REDIRECT_KEY, path);
}

export function takePendingRedirect(): string | null {
  if (typeof window === "undefined") return null;
  const value = window.sessionStorage.getItem(REDIRECT_KEY);
  if (value) window.sessionStorage.removeItem(REDIRECT_KEY);
  return value;
}

export function useDemoSession() {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSession(read());
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const signOut = useCallback(() => signOutDemo(), []);

  return { session, ready, isAuthenticated: Boolean(session), signOut };
}
