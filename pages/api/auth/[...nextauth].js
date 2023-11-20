import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetAll } from "./register";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const usuarios = await GetAll();
        const usuarioEncontrado = usuarios.find(
          (user) => user.name === username && user.password === password
        );
        if (usuarioEncontrado) {
          return usuarioEncontrado;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: ["/dashboard", "control_panel"],
  },
});
