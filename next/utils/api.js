import useSwr from 'swr';

export function useFiles(repoString) {
    const { data, error } = useSwr(`/api/tree/${repoString}`);

    return {
        files: data?.files,
        isLoading: !error && !data,
        isError: error,
    };
}
