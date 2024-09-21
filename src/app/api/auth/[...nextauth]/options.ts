import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/lib/db";
import type { NextAuthOptions } from "next-auth";


export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,

      async profile(profile) {
      
        return {
          id: profile.id,
          email: profile.email,
          name: profile.login,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials?.username },
        });

        if (user && credentials?.password === user.password) {
            return { id: user.id, email: user.email, name: user.name };
          }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
        console.log(user)
        if (account?.provider === 'github') {
          if (user.email && user.id && user.name) {
            const existingUser = await db.user.findUnique({
              where: { email: user.email },
            
            });
  
            if (!existingUser) {
              await db.user.create({
                data: {
        
                  email: user.email as string,
                  name: user.name as string,
                  password: "asdqwdwdwdadaeawsda83138838",
                  phone: "",
                  bio: "hello.",
                  user_img: "",
                  
                },
              });
            }
          } else {
            throw new Error('Missing user information from GitHub profile.');
          }
        }
        return true;
      },
    async session({ session, user }) {
      
      if (user) {
        session.user = { ...session.user, email: user.email };
      }
      return session;
    },

    async jwt({ token, user }) {
      
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

