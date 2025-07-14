"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Проверка авторизации (минимальная)
    const apiKey = typeof window !== 'undefined' ? sessionStorage.getItem('apiKey') : null;
    if (!apiKey) {
      router.push("/");
      return;
    }
    // Получение пользователей
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });
      if (error) setError("Ошибка загрузки пользователей: " + error.message);
      else setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6">Зарегистрированные пользователи</h1>
        {loading && <div>Загрузка...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Аватар</th>
                  <th className="px-4 py-2 text-left">Имя</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Способ регистрации</th>
                  <th className="px-4 py-2 text-left">Дата регистрации</th>
                  <th className="px-4 py-2 text-left">Последний вход</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">
                      {user.image ? (
                        <img src={user.image} alt={user.name || user.email} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-700">
                          {user.name ? user.name.charAt(0) : "U"}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">{user.name || "-"}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.registered_via || "-"}</td>
                    <td className="px-4 py-2">{user.created_at ? new Date(user.created_at).toLocaleString() : "-"}</td>
                    <td className="px-4 py-2">{user.last_login ? new Date(user.last_login).toLocaleString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 