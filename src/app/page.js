"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboards");
    }
  }, [session, router]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboards" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 text-center">
        <Image
          className="mx-auto mb-6"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={25}
          priority
        />
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          GitHub Summarizer
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Интеллектуальная суммаризация GitHub репозиториев с помощью AI
        </p>
        
        {!session ? (
          <button
            onClick={handleGoogleSignIn}
            className="inline-flex items-center justify-center w-full px-6 py-4 rounded-lg bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold text-lg shadow-lg transition transform hover:scale-105 mb-4"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Войти через Google
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-800">{session.user?.name}</p>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
              </div>
            </div>
            <Link
              href="/dashboards"
              className="inline-block w-full px-6 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold text-lg shadow-lg transition transform hover:scale-105"
            >
              Перейти в приложение
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-block w-full px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
            >
              Выйти
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
