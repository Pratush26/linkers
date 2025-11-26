import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    role?: "user" | "admin" | "rider";
    image?: string;
  }

  interface Session {
    user: {
      username?: string;
      role?: "user" | "admin" | "rider";
      image?: string;
      email?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    role?: "user" | "admin" | "rider";
    image?: string;
    email?: string;
  }
}