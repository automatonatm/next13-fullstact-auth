import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";


import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
     
      name: "Credentials",
      
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@mail.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {

       
        
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

       

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  


};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
