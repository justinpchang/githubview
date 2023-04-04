import { getSession } from 'next-auth/client';
import { Octokit } from 'octokit';

export default async function handler(req, res) {
    const [user, repo] = req.query.slug;

    try {
        const session = await getSession({ req });
        /*
        if (!session?.username || !session?.accessToken) {
            res.status(401).send('not logged in');
            return;
        }
        */

        const octokit = new Octokit(
            session
                ? {
                      auth: session.accessToken,
                  }
                : {}
        );

        const commits = (
            await octokit.request(
                `GET https://api.github.com/repos/${user}/${repo}/commits`,
                {
                    headers: {
                        'X-Github-Api-Version': '2022-11-28',
                    },
                }
            )
        ).data;
        const sha = commits[0].sha;
        const tree = (
            await octokit.request(
                `GET https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=true`,
                {
                    headers: {
                        'X-Github-Api-Version': '2022-11-28',
                    },
                }
            )
        ).data.tree;

        let obj = { files: [] };
        for (const file of tree) {
            if (file.type !== 'tree') {
                obj.files.push({
                    key: file.path,
                });
            }
        }

        res.status(200).json(obj);
    } catch (err) {
        console.log(err);
        res.status(500).send('failed!');
    }
}
