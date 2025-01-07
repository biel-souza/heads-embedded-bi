import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import jsonwebtoken from "jsonwebtoken";
import api_login from "@/utils/api_login";

declare module "next-auth" {
  interface Session {
    jwt?: string;
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
    user?: string;
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
        try {
          const user = credentials?.user as string;
          const password = credentials?.password as string;

          if (!user || !password) {
            return null;
          }

          const { data: userLogin } = await api_login.post("/login", { user, password });

          if (!userLogin) {
            return null;
          }

          return { id: userLogin.id, name: userLogin.name, type: userLogin.type, user: userLogin.user };
        } catch (error) {
          return null;
        }
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
        maxAge: 60 * 60 * 2,
      },
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.type = user.type;
        token.user = user.user;
      }
      return token;
    },
    session({ session, token }) {
      session.user.type = token.type as string;

      const jwt = jsonwebtoken.sign(session.user, process.env.NEXTAUTH_SECRET as string);
      session.jwt = jwt;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
