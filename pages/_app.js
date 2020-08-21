import { useEffect, useState } from 'react';
import Router from 'next/router';
import Bowser from 'bowser';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import BrowserWarning from '../openCall/components/BrowserWarning';
import "../components/stylesheets/styles.css";

// Hide the default spinner to just use the progress bar
NProgress.configure({ showSpinner: false });

// Add the event handlers so the progress bar works with next router
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

    const [goodBrowser, setGoodBrowser] = useState(true);

    useEffect(() => {
        let browser = Bowser.getParser(window.navigator.userAgent);
        console.log(browser.getBrowserName());
        if (browser.getBrowserName() === "Internet Explorer"){
            setGoodBrowser(false);
        }
    },[]);

    return goodBrowser ? <Component {...pageProps} /> : <BrowserWarning {...pageProps}/>;
}