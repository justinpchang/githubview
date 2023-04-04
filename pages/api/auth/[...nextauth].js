import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.GitHub({
            id: 'github',
            name: 'GitHub',
            type: 'oauth',
            version: '2.0',
            scope: 'repo',
            accessTokenUrl: 'https://github.com/login/oauth/access_token',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            profileUrl: 'https://api.github.com/user',
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: { params: { scope: 'repo ' } },
        }),
    ],
    callbacks: {
        async session(session, token) {
            session.accessToken = token.accessToken;
            session.username = token.username;
            return session;
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
                token.username = profile.login;
            }
            return token;
        },
    },
});
