import { useRouter } from 'next/router';

export default function Viewer() {
    const router = useRouter();
    const { slug } = router.query;

    console.log(slug);

    return <>
        <h1>Hello</h1>
    </>;
};