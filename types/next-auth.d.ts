import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    role?: "user" | "admin" | "rider";
    email?: string;
    image?: string;
  }

  interface Session {
    user: {
      _id?: string;
      username?: string;
      role?: "user" | "admin" | "rider";
      image?: string;
      email?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    role?: "user" | "admin" | "rider";
    image?: string;
    email?: string;
  }
}