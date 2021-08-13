import axios from 'axios';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
    const [user, repo] = req.query.slug;

    try {
        const session = await getSession({ req });
        if (!session?.username || !session?.accessToken) {
            res.status(401).send('not logged in');
        }

        // Get data from Github API
        const token = Buffer.from(`${session.username}:${session.accessToken}`, 'utf8').toString('base64');
        const commits = (await axios.get(`https://api.github.com/repos/${user}/${repo}/commits`, {
            headers: {
                'Authorization': `Basic ${token}`,
            },
        })).data;
        const sha = commits[0].sha;
        const tree = (await axios.get(`https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=true`, {
            headers: {
                'Authorization': `Basic ${token}`,
            },
        })).data.tree;

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
