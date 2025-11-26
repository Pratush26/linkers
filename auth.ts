import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./libs/dbConnect";
import User from "./models/User";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        const isPasswordValid = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );
        if (!isPasswordValid) throw new Error("Invalid password");

        return {
          _id: user._id.toString(),
          image: user.image,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectDB();
        const dbUser = await User.findOne({ email: profile?.email });
        if (!dbUser) return "/register";
        user._id = dbUser._id.toString();
        user.username = dbUser.username;
        user.role = dbUser.role;
        user.image = dbUser.image;
        return true;
      }
      return true; // allow credentials login
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role ?? "user";
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user._id = token._id as string;
      session.user.username = token.username as string;
      session.user.email = token.email as string;
      session.user.role = token.role as "user" | "admin" | "rider";
      session.user.image = token.image as string;
      return session;
    },
  },
});
