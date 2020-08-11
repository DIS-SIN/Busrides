import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import "../components/stylesheets/styles.css";

// Hide the default spinner to just use the progress bar
NProgress.configure({ showSpinner: false });

// Add the event handlers so the progress bar works with next router
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}