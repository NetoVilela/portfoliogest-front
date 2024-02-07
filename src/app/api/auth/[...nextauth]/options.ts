import api from '@/services/api';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';

type DecodedPayloadType = {
  userId: string,
  name: string,
  email: string,
  profileId: string,
  profileName: string,
  token: string,
  avatarFilePath: string,
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      async authorize(credentials, req): Promise<any | null> {

        try {
          const response = await api.post('/auth/login', credentials);

          if (response.status === 200) {
            const decodedPayload = jwt.decode(response.data.access_token) as DecodedPayloadType;
            if (decodedPayload) {
              const user = {
                id: decodedPayload.userId,
                name: decodedPayload.name,
                email: decodedPayload.email,
                profileId: decodedPayload.profileId,
                profileName: decodedPayload.profileName,
                token: response.data.access_token,
                avatarUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${decodedPayload.avatarFilePath}`,
              };
              return user;
            } else {
              return null;
            }

          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error.response.data.message);
          throw new Error(error.response.data.message);
        }

      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login'
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {

      return { ...token, ...user };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    async session({ session, token, user }: any): Promise<any> {

      session.user = token;
      session.user.accessToken = token.token;

      return session;
    },
  },
};