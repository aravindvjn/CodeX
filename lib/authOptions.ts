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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, account, profile }: { token: JWT; account?: any; profile?: any }) {
            if (account?.provider && profile) {
                try {
                    const existingUser = await query(
                        'SELECT id,username FROM users WHERE email = $1 AND provider = $2',
                        [profile.email, account.provider]
                    );

                    let userId;
                    let username;

                    if (existingUser.rows.length > 0) {
                        userId = existingUser.rows[0].id;
                        username = existingUser.rows[0].username;
                    } else {
                        const result = await query(
                            `INSERT INTO users (email, name, provider) 
                             VALUES ($1, $2, $3) RETURNING id, username`,
                            [
                                profile.email,
                                profile.name || 'Unknown',
                                account.provider,
                            ]
                        );
                        userId = result.rows[0].id;
                        username=result.rows[0].username;
                    }
                    token.username = username || '';
                    token.id = userId;
                    token.email = profile.email;
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
                session.user.username = token.username;
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
