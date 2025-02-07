import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { credentialsLogin } from "@/lib/api";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials): Promise<User | null> => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) {
          console.error("Email or password is missing");
          return null;
        }

        try {
          const user = await credentialsLogin({ email, password });

          if (!user) {
            console.error("User not found or invalid credentials");
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error during credentialsLogin:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    error: '/login',
    signIn: '/dashboard',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
    async signIn({ user }) {
      return !!user;
    },
    async redirect({ url, baseUrl }) {
      
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});