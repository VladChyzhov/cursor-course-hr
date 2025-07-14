'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedAreaPage() {
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Проверяем аутентификацию при загрузке страницы
  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey');
    if (!apiKey) {
      router.push('/');
      return;
    }

    // Проверяем валидность ключа
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/protected', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ apiKey }),
        });

        const data = await response.json();
        if (!data.valid) {
          sessionStorage.removeItem('apiKey');
          router.push('/');
          return;
        }

        setIsAuthenticated(true);
      } catch (err) {
        sessionStorage.removeItem('apiKey');
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const apiKey = sessionStorage.getItem('apiKey');
      const res = await fetch('/api/github-summarizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUrl, apiKey }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Ошибка при обработке запроса.');
        return;
      }
      
      if (!data ||
        !data.purpose ||
        !Array.isArray(data.features) ||
        !Array.isArray(data.tech_stack) ||
        !data.usage ||
        !data.audience
      ) {
        setError('Не удалось сгенерировать резюме. Проверьте URL репозитория или попробуйте другой публичный репозиторий.');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Ошибка запроса. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('apiKey');
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка аутентификации...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">GitHub Summarizer</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Выйти
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">Суммаризация GitHub репозитория</h2>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL GitHub репозитория</label>
          <input
            type="text"
            value={githubUrl}
            onChange={e => setGithubUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 text-base mb-4"
            placeholder="https://github.com/vercel/next.js"
            required
          />
          <button
            type="submit"
            disabled={loading || !githubUrl.trim()}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold shadow transition disabled:opacity-50"
          >
            {loading ? 'Суммаризация...' : 'Суммаризировать'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="text-red-600 font-semibold">{error}</div>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">Результат суммаризации</h3>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Назначение проекта</h4>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">{result.purpose}</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Ключевые возможности</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {result.features.map((feature, idx) => (
                  <li key={idx} className="leading-relaxed">{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Технологический стек</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {result.tech_stack.map((tech, idx) => (
                  <li key={idx} className="leading-relaxed">{tech}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Инструкция по использованию</h4>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">{result.usage}</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Целевая аудитория</h4>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">{result.audience}</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Преимущества</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {result.strengths.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Ограничения</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {result.limitations.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 