"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = (provider = "google", callbackUrl = "/dashboards") => {
    signIn(provider, { callbackUrl });
  };

  const logout = (callbackUrl = "/") => {
    signOut({ callbackUrl });
  };

  return {
    session,
    status,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    login,
    logout,
  };
}

// Новый отдельный хук для обязательной аутентификации
export function useRequireAuth(redirectTo = "/") {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push(redirectTo);
    }
  }, [session, status, router, redirectTo]);

  return { session, status, isAuthenticated: !!session };
} 