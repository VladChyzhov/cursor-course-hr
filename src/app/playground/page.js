'use client';

import { useState } from 'react';
import { useToast, Toast } from '../../components/notifications';
import { useRouter } from 'next/navigation';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast, toastKey, toastMessage, toastType, showToastMessage } = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/protected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        showToastMessage('valid api key, /protected can be accessed', 'success');
        setTimeout(() => {
          router.push('/protected-area');
        }, 1200);
      } else {
        showToastMessage('Invalid API Key', 'error');
      }
    } catch (err) {
      showToastMessage('Ошибка соединения с сервером', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">API Playground</h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
        <input
          type="text"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 text-base mb-4"
          placeholder="Enter your API key"
          required
        />
        <button
          type="submit"
          disabled={loading || !apiKey.trim()}
          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold shadow transition disabled:opacity-50"
        >
          {loading ? 'Проверка...' : 'Проверить доступ'}
        </button>
      </form>
      {showToast && (
        <Toast showToast={showToast} toastKey={toastKey} toastMessage={toastMessage} toastType={toastType} />
      )}
    </div>
  );
} 