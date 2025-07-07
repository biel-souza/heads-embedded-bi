import Credentials from "next-auth/providers/credentials";
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
    jwt?: string;
    user?: User;
  }

  interface User {
    id: number;
    name: string;
    user: string;
    type: string;
    token?: string;
    company: {
      id: number;
      description: string;
      mobile_mode: boolean;
    };
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

          if (!userLogin || !userLogin.user) {
            return null;
          }

          const userData = {
            ...userLogin.user,
            token: userLogin.token,
          };

          return userData;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "next-auth.session-token-none",
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 2,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
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
          name: user.name,
        };
        token.jwt = user.token;
      }

      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
      }

      if (token.jwt) {
        session.jwt = token.jwt as string;
      }

      return session;
    },

    async redirect({ baseUrl, url }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
