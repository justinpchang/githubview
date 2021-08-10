import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Browser = dynamic(() => import('../components/Browser'), {
    ssr: false,
});
const Viewer = dynamic(() => import('../components/Viewer'), {
    ssr: false,
});

const files = [
    {
        key: 'README.md',
    },
    {
        key: 'direct/nested.js',
    },
    {
        key: 'direct/another/super.js',
    },
];

export default function Home() {
    const router = useRouter();
    const { slug } = router.query;

    const handleFileClick = (filepath) => {
        console.log(filepath);
    };

    return (
        <div class="container">
            <Browser files={files} handleFileClick={handleFileClick} />
            <Viewer />
        </div>
    );
};