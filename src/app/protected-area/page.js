'use client';

export default function ProtectedAreaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Доступ разрешён</h1>
        <p className="text-lg text-gray-700">Сейчас вы имеете доступ к этой защищённой странице.</p>
      </div>
    </div>
  );
} 