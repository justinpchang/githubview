import axios from 'axios';
import { useState, useEffect } from 'react';

export function useFiles(repopath) {
    const [files, setFiles] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (!repopath) return;

        setFiles();
        setError();
        axios
            .get(`/api/tree/${repopath}`)
            .then((res) => {
                setFiles(res.data.files);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            });
    }, [repopath]);

    return {
        files,
        filesError: error,
        filesLoading: !error && !files,
    };
}

export function useFile(repopath, filepath) {
    const [file, setFile] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        (async () => {
            if (!repopath || !filepath) return;

            setFile();
            setError();

            try {
                const fileUrl = (
                    await axios.get(
                        `/api/file/${repopath}?filepath=${Buffer.from(
                            filepath
                        ).toString('base64')}`
                    )
                ).data;

                const fileBlob = (
                    await axios.get(fileUrl, { responseType: 'blob' })
                ).data;

                const fileText = await new Response(fileBlob).text();

                setFile(fileText);
            } catch (err) {
                console.error(err);
                setError(err);
            }
        })();
    }, [repopath, filepath]);

    return {
        file,
        fileError: error,
        fileLoading: !error && !file,
    };
}
