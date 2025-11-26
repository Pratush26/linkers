import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import connectDB from "./libs/dbConnect"
import User from "./models/User"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      try {
        await connectDB()
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");
        return {
          image: user.image,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      } catch (error) {
        console.error(error)
        return null;
      }
    }
  })
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.image = user.image;
        token.username = user.username as string;
        token.email = user.email;
        token.role = user.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.image = token.image as string;
      session.user.username = token.username as string;
      session.user.email = token.email as string;
      session.user.role = (token.role ?? "user") as "user" | "admin" | "rider";
      return session;
    },
  },
})