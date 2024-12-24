import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: string;
  }
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      credentials: {
        user: {
          label: "Usuário",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = credentials?.user as string;
        const password = credentials?.password as string;

        if (!user || !password) {
          return null;
        }

        return { id: "1" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
