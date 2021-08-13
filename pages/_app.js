import { Provider } from 'next-auth/client';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import '../styles/browser.css';
import '../styles/viewer.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
