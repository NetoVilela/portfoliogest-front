import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any | null> {
        const user = {
          id: 123,
          email: "teste@email.com",
          password: "teste",
        }

        if(credentials?.email === user.email && credentials?.password === user.password) {
          return user;
        }
        return null;
      }
    })
  ]
})

export { handler as GET, handler as POST }