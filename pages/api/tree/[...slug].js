import { getSession } from 'next-auth/client';
import { Octokit } from 'octokit';

export default async function handler(req, res) {
    const [user, repo] = req.query.slug;

    try {
        const session = await getSession({ req });

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

        console.log(tree);

        let obj = { files: [] };
        for (const file of tree) {
            if (file.type !== 'tree') {
                obj.files.push({
                    key: file.path,
                });
            }
        }
        console.log(obj);

        res.status(200).json(obj);
    } catch (err) {
        console.log(err);
        res.status(500).send('failed!');
    }
}
