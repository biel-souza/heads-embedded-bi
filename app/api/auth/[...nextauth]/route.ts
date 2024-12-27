import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      name?: string;
      user?: string;
      type?: string;
    };
  }

  interface JWT {
    type?: string;
  }

  interface User {
    type?: string;
  }
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
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
        console.log("authorize");
        console.log(credentials);
        const user = credentials?.user as string;
        const password = credentials?.password as string;

        if (!user || !password) {
          return null;
        }

        return { id: "1", name: user, type: "teste" };
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: undefined,
      },
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.type = user.type;
      }
      return token;
    },
    session({ session, token }) {
      session.user.type = token.type as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
