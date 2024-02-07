// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      sub: string;
      userId: string,
      name: string,
      email: string,
      profileId: number,
      profileName: string,
      iat: number,
      exp: number,
      accessToken: string;
      avatarUrl: string;
    }
  }
}