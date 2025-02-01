import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// NextAuthOptions object
export const authOptions = {
    // config auth providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password"}
            },

            async authorize(credentials) {
                // compare credentials to evn variables
                if (
                    credentials?.username === process.env.ADMIN_USERNAME &&
                    credentials?.password === process.env.ADMIN_PASSWORD
                ) {
                    // if matched/valid return an object 
                    return {
                        id: "admin",
                        name: "Admin",
                        email: "gdahal092801@gmail.com"
                    };
                }
                // if invalid creadentials return null
                return null;
            }
        })
    ],

    // secret for sigining the JWT
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    // custom login page
    pages: {
        signIn: "/admin/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };