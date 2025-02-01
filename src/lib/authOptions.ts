// src/lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin", name: "Admin", email: "admin@example.com" };
        }
        return null;
      },
    }),
  ],

  // Secret for signing the JWT
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt", // This is now typed as the literal "jwt"
  },

  pages: {
    signIn: "/admin/login",
  },
};
