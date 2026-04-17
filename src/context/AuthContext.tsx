"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { SessionPayload } from "@/lib/auth";
import { SESSION_COOKIE, clearSessionCookie, parseSession } from "@/lib/auth";

interface AuthContextValue {
  user: SessionPayload | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<SessionPayload | null>(null);

  // Load session from cookie on mount
  useEffect(() => {
    const session = parseSession(document.cookie);
    setUser(session);
  }, []);

  const logout = useCallback(() => {
    clearSessionCookie();
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
