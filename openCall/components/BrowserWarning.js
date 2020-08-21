import React from 'react';
import Bowser from "bowser";
import PropTypes from 'prop-types';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import dictionaryEn from '../../locales/en';
import dictionaryFr from '../../locales/fr';
import styles from './BrowserWarning.module.css';

export default function BrowserWarning(props) {

    const browser = Bowser.getParser(window.navigator.userAgent);

    const t = props.locale === "fr" ? dictionaryFr : dictionaryEn;

    return (
        <div className={styles.browserWarning}>
            <Header t={t} settings={props.settings}/>
            <div className={styles.warningContainer}>
                <div>
                    <p className={styles.uhOh}>Uh oh!</p>
                    <h1>{browser.getBrowserName()} {t.browserWarningTitle}</h1>
                    <p>{t.browserWarningMessage}</p>
                    <div className={styles.browserList}>
                        <div className={styles.browser}>
                            <img src="/images/browsers/edge.png" alt="Microsoft Edge"/>
                            Edge
                        </div>
                        <div className={styles.browser}>
                            <img src="/images/browsers/safari.png" alt="Safari"/>
                            Safari
                        </div>
                        <div className={styles.browser}>
                            <img src="/images/browsers/chrome.png" alt="Google Chrome"/>
                            Chrome
                        </div>
                        <div className={styles.browser}>
                            <img src="/images/browsers/firefox.png" alt="Mozilla Firefox"/>
                            Firefox
                        </div>
                        <div className={styles.browser}>
                            <img src="/images/browsers/opera.png" alt="Opera"/>
                            Opera
                        </div>
                    </div>
                </div>
            </div>
            <Footer t={t}/>
        </div>
    );
}

BrowserWarning.propTypes = {
    locale: PropTypes.oneOfType([
        PropTypes.oneOf([
            "en",
            "fr"
        ]),
        PropTypes.string
    ]).isRequired
};