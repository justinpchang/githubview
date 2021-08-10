import trees from 'github-trees';

const opts = {
    recursive: true,
    username: 'justinpchang',
    password: 'jBanana01!',
};

export default function handler(req, res) {
    const [user, repo] = req.query.slug;
    console.log(user, repo)
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
            res.status(500).send('failed!');
        });
}
