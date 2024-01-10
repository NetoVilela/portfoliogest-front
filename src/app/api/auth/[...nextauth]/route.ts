import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      async authorize(credentials, req): Promise<any | null> {
        
        const user = {
          id: 123,
          email: 'teste@email.com',
          password: 'teste',
        };

        if(credentials?.email === user.email && credentials?.password === user.password) {
          return user;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login'
  }
});

export { handler as GET, handler as POST };