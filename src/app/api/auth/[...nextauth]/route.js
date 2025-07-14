import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from '../../../../lib/supabaseClient';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user && user.email) {
        await supabase
          .from('users')
          .upsert({
            email: user.email,
            name: user.name,
            image: user.image,
            registered_via: 'google',
            last_login: new Date().toISOString(),
          }, { onConflict: 'email' });
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 