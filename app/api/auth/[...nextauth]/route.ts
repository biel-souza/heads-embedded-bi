import Credentials from "next-auth/providers/credentials";
import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      user?: string;
    };
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
        console.log(credentials);
        const user = credentials?.user as string;
        const password = credentials?.password as string;

        if (!user || !password) {
          return null;
        }

        console.log(user);

        return { id: "1", name: credentials?.user };
      },
    }),
  ],
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
