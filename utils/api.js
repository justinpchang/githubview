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
        if (!repopath || !filepath) return;

        setFile();
        setError();
        axios
            .get(
                `/api/file/${repopath}?filepath=${Buffer.from(
                    filepath
                ).toString('base64')}`,
                {
                    transformResponse: (r) => r,
                }
            )
            .then((res) => {
                setFile(res.data);
            })
            .catch((err) => {
                setError(err);
            });
    }, [repopath, filepath]);

    return {
        file,
        fileError: error,
        fileLoading: !error && !file,
    };
}