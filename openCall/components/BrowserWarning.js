import React from 'react';
import PropTypes from 'prop-types';
import dictionaryEn from '../../locales/en';
import dictionaryFr from '../../locales/fr';
import styles from './BrowserWarning.module.css';

export default function BrowserWarning(props) {

    const t = props.locale === "fr" ? dictionaryFr : dictionaryEn;

    return (
        <div className={styles.browserWarning}>
            <div className={styles.warningContainer}>
                <div>
                    <p className={styles.uhOh}>Uh oh!</p>
                    <h1>{props.browserName} {t.browserWarningTitle}</h1>
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