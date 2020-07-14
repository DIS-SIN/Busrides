import React from 'react';
import Bowser from "bowser";
import { GCFooter } from 'gc-tortilla';
import Header from './Header';
import gocFooterLogo from '../images/gocFooterLogo.png';
import edgeIcon from '../images/browsers/edge.png';
import safariIcon from '../images/browsers/safari.png';
import chromeIcon from '../images/browsers/chrome.png';
import firefoxIcon from '../images/browsers/firefox.png';
import operaIcon from '../images/browsers/opera.png';

import './BrowserWarning.css';

export default function BrowserWarning(props) {

    const browser = Bowser.getParser(window.navigator.userAgent);

    return (
        <div className="browserWarning">
            <Header t={props.t}/>
            <div className="warningContainer">
                <div>
                    <p className="uhOh">Uh oh!</p>
                    <h1>{browser.getBrowserName()} {props.t.browserWarningTitle}</h1>
                    <p>{props.t.browserWarningMessage}</p>
                    <div className="browserList">
                        <div className="browser">
                            <img src={edgeIcon} alt="Microsoft Edge"/>
                            Edge
                        </div>
                        <div className="browser">
                            <img src={safariIcon} alt="Safari"/>
                            Safari
                        </div>
                        <div className="browser">
                            <img src={chromeIcon} alt="Google Chrome"/>
                            Chrome
                        </div>
                        <div className="browser">
                            <img src={firefoxIcon} alt="Mozilla Firefox"/>
                            Firefox
                        </div>
                        <div className="browser">
                            <img src={operaIcon} alt="Opera"/>
                            Opera
                        </div>
                    </div>
                </div>
            </div>
            <GCFooter
                theme={"light"}
                FIP={{
                    image: gocFooterLogo,
                    altText: "Symbol of the Government of Canada / Symbole du gouvernement du Canada"
                }}
                links={[
                    {
                        url: props.t.getPrivacyLink,
                        label: props.t["Privacy"]
                    },
                    {
                        url: "https://icons8.com",
                        label: props.t["Icons"]
                    }
                ]}
            />
        </div>
    );
}