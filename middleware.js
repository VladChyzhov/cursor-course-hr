import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Дополнительная логика middleware если нужна
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboards/:path*",
    "/playground/:path*",
    // Добавьте другие защищенные маршруты здесь
  ],
}; 