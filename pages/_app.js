import React, { useEffect } from 'react';
import Router from 'next/router';
import Bowser from 'bowser';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { initGA, logPageView } from '../helpers/analytics';
import BrowserWarning from '../components/organisms/BrowserWarning';
import SnackBar from '../components/molecules/SnackBar';
import "../components/stylesheets/kg-bookmark.css";
import "../components/stylesheets/styles.css";

// Hide the default spinner to just use the progress bar
NProgress.configure({ showSpinner: false });

// Add the event handlers so the progress bar works with next router
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true;
        }
        logPageView();
    },[Component]);

    function validateBrowser() {
        if (pageProps.userAgent){
            let browser = Bowser.getParser(pageProps.userAgent);
            if (browser.getBrowserName() === "Internet Explorer"){
                pageProps.browserName = browser.getBrowserName();
                return false;
            }
        }
        return true;
    }

    return (
        validateBrowser() ?
        <React.Fragment>
            <SnackBar {...pageProps}/>
            <Component {...pageProps} />
        </React.Fragment>
        :
        <BrowserWarning {...pageProps}/>
    );
}