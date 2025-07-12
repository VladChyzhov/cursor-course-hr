import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        <Link
          href="/dashboards"
          className="inline-block w-full px-6 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold text-lg shadow-lg transition transform hover:scale-105"
        >
          Перейти в приложение
        </Link>
      </div>
    </div>
  );
}
