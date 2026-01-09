import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      slug?: string | null;
      phone?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    slug?: string | null;
    phone?: string | null;
  }
}
