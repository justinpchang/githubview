import trees from 'github-trees';

const opts = {
    recursive: true,
    username: 'justinpchang',
    password: 'jBanana01!',
};

export default async function handler(req, res) {
    const [user, repo] = req.query.slug;

    try {
        let obj = { files: [] };
        const data = await trees(`${user}/${repo}`, opts)

        for (const file of data.tree) {
            if (file.type !== 'tree') {
                obj.files.push({
                    key: file.path,
                });
            }
        }

        res.status(200).json(obj);
    } catch (err) {
        res.status(500).send('failed!');
    }
}
