import { getSession } from 'next-auth/client';
import { Octokit } from 'octokit';

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');

    const [user, repo] = req.query.slug;
    const filepath = Buffer.from(req.query.filepath, 'base64').toString(
        'ascii'
    );

    if (!user || !repo || !filepath) res.end('');

    const session = await getSession({ req });

    const octokit = new Octokit(
        session
            ? {
                  auth: session.accessToken,
              }
            : {}
    );

    try {
        const response = await octokit.request(
            `GET /repos/${user}/${repo}/contents/${filepath}`
        );
        res.status(200).send(response.data.download_url);
    } catch (err) {
        res.status(500).send('failed!');
    }
}
