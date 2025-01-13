import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "admin@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // find the user in the db
                const user = await prisma.user.findUnique({
                    where: {email: credentials?.email },
                });

                // validate the user and their role
                if (user && credentials?.password === process.env.ADMIN_PASSWORD && user.role === "ADMIN") {
                    return user;
                }
                return null;
            }
        })
    ],

    pages: {
        signIn: "/authAdmin/signIn",
    },

    callbacks: {
        async session({ session, token }) {
            // attach the user role to the session
            if (session.user?.email){
                const dbUser = await prisma.user.findUnique({
                    where: { email: session.user.email || "" },
                });

                if (dbUser) {
                    session.user.role = dbUser.role;
                }
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})