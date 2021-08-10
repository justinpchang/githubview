import get from 'get-file';

function getFileAsync(repopath, filepath) {
    return new Promise((resolve, reject) => {
        get(repopath, filepath, (err, data) => {
            if (err !== null) reject(err);
            else resolve(data);
        });
    });
}

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');

    const [user, repo] = req.query.slug;
    const filepath = Buffer.from(req.query.filepath, 'base64').toString('ascii');

    if (!user || !repo || !filepath) res.end('');

    try {
        const data = await getFileAsync(`${user}/${repo}`, filepath);
        await new Promise((resolve) => {
            data.pipe(res);
            data.on('end', resolve);
        });
    } catch (err) {
        res.status(500).send('failed!');
    }
}