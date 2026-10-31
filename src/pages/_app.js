import '@/styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

/**
 * Custom App: wraps every page. Global CSS (Tailwind + Prism code theme) can
 * only be imported here in Next.js.
 *
 * @param {{ Component: Function, pageProps: object }} props - The page to render and its props.
 */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
