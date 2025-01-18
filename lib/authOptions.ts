import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { query } from './db';

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

                const result = await query('SELECT * FROM users WHERE email = $1', [email]);
                const user = result.rows[0];
                
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
                session.user = session.user || {};
                session.user.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.SECRET,
};
