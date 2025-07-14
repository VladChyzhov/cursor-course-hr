"use client";

import { useSession } from "next-auth/react";
import { useAuth } from "../../../hooks/useAuth";
import AuthStatus from "../../../components/AuthStatus";

export default function AuthTestPage() {
  const { session, status, isAuthenticated, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-8">
            Тест аутентификации
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Статус аутентификации */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Статус аутентификации
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Статус:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    status === "loading" ? "bg-yellow-100 text-yellow-800" :
                    status === "authenticated" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {status === "loading" ? "Загрузка..." :
                     status === "authenticated" ? "Авторизован" :
                     "Не авторизован"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Аутентифицирован:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    isAuthenticated ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {isAuthenticated ? "Да" : "Нет"}
                  </span>
                </div>
              </div>
            </div>

            {/* Информация о пользователе */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Информация о пользователе
              </h2>
              {session?.user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {session.user.image && (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {session.user.name || "Не указано"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.user.email || "Не указано"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Пользователь не авторизован</p>
              )}
            </div>
          </div>

          {/* Действия */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Действия
            </h2>
            <div className="flex flex-wrap gap-4">
              {!isAuthenticated ? (
                <button
                  onClick={() => login()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Войти через Google
                </button>
              ) : (
                <button
                  onClick={() => logout()}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
                >
                  Выйти
                </button>
              )}
              
              <button
                onClick={() => window.location.href = "/dashboards"}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
              >
                Перейти в приложение
              </button>
            </div>
          </div>

          {/* Компонент AuthStatus */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Компонент AuthStatus
            </h2>
            <AuthStatus />
          </div>

          {/* Отладочная информация */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Отладочная информация
            </h2>
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify({ session, status, isAuthenticated }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 