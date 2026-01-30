import "next-auth";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface User {
    _id: string;
    isVerified: boolean;
    AcceptMessages: boolean;
    UserName: string;
  }

  interface Session {
    user: {
      _id: string;
      isVerified: boolean;
      AcceptMessages: boolean;
      UserName: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    AcceptMessages?: boolean;
    UserName?: string;
  }
}
