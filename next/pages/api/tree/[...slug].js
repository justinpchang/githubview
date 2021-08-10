import trees from 'github-trees';

const opts = {
    recursive: true,
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_PASSWORD,
};

export default function handler(req, res) {
    const [user, repo] = req.query.slug;
    trees(`${user}/${repo}`, opts)
        .then((data) => {
            let obj = { files: [] };
            for (const file of data.tree) {
                if (file.type !== 'tree') {
                    obj.files.push({
                        key: file.path,
                    });
                }
            }

            res.status(200).json(obj);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end('failed!');
        });
}
