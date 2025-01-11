import Credentials from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import NextAuth from "next-auth";

import type { User } from "@/types/nextAuth.type";
import api_login from "@/utils/api_login";

declare module "next-auth" {
  interface Session {
    jwt?: string;
    user: User;
  }

  interface JWT {
    type?: string;
  }

  interface User {
    id: number;
    name: string;
    user: string;
    type: string;
    company: { id: number; description: string; pbi_client_id: string; pbi_password: string; pbi_user: string };
    panels: { id: number; description: string; report_id: string; filter: string }[];
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

          return {
            id: userLogin.id,
            name: userLogin.name,
            type: userLogin.type,
            user: userLogin.user,
            company: userLogin.company,
            panels: userLogin.panels,
          };
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
        token.user = {
          id: user.id,
          type: user.type,
          user: user.user,
          panels: user.panels,
          company: user.company,
        };
      }

      return token;
    },
    session({ session, token }) {
      session.user = token.user as User;

      const jwt = jsonwebtoken.sign(session.user, process.env.NEXTAUTH_SECRET as string);
      session.jwt = jwt;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
