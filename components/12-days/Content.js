import React from 'react';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import Data_EN from './Data';
import Data_FR from './Data-fr';
import Link from './Link';
import styles from './Content.module.css';

export default function Content(props) {

    // let url = window.location !== window.parent.location ? document.referrer : document.location.href;
    // let Data = url.includes("/fr/") ? Data_FR : Data_EN;
    let Data = Data_EN;

    const dayContent = Data[`day_${props.day}`];

    if (dayContent){
        return (
            <React.Fragment>
                <div className={props.contentIsOpen ? styles.contentBackgroundCover : `${styles.contentBackgroundCover} ${styles.hide}`}></div>
                <div className={props.contentIsOpen ? `${styles.content} ${styles.open}` : styles.content}>
                    <button className={styles.closeButton} onClick={() => props.openContent(false)} tabIndex="0">
                        <IcomoonReact iconSet={iconSet} size={20} icon="close"/>
                    </button>
                    <div className={styles.contentContainer}>
                        <h2>{dayContent.title}</h2>
                        <p>{dayContent.text}</p>
                        <Link data={dayContent.link}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    return null;
}
