import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { query } from './db';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, account, profile }: { token: JWT; account?: any; profile?: any }) {
            if (account?.provider && profile) {
                try {
                    const existingUser = await query(
                        'SELECT id FROM users WHERE email = $1 AND provider = $2',
                        [profile.email, account.provider]
                    );

                    let userId;
                    if (existingUser.rows.length > 0) {
                        userId = existingUser.rows[0].id;
                    } else {
                        const result = await query(
                            `INSERT INTO users (email, name, provider) 
                             VALUES ($1, $2, $3) RETURNING id`,
                            [
                                profile.email,
                                profile.name || 'Unknown',
                                account.provider,
                            ]
                        );
                        userId = result.rows[0].id;
                    }

                    token.id = userId;
                    token.email = profile.email;
                    token.name = profile.name || 'Unknown';
                    token.picture = profile.picture || profile.avatar_url;
                } catch (error) {
                    console.error('Error during user query:', error);
                }
            }

            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.user = session.user || {};
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.picture;
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    secret: process.env.SECRET,
    pages: {
        signIn: '/auth',
    },
};
