import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt'; 
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('Credentials are required');
                }

                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error('Email and password are required');
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (user && user.password) {
                    const isValid = await bcrypt.compare(password, user.password);
                    if (isValid) {
                        return { id: user.id, name: user.name, email: user.email } as User;
                    }
                }

                throw new Error('Invalid email or password');
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token?.id) {
                session.user = session.user || {}; // Initialize user object if it's undefined
                session.user.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.SECRET,
};
