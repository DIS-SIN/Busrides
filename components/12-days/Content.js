import React from 'react';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import Link from './Link';
import styles from './Content.module.css';

export default function Content(props) {

    const dayContent = props.data.content[`day_${props.day}`];

    if (dayContent){
        return (
            <React.Fragment>
                <div className={props.contentIsOpen ? styles.contentBackgroundCover : `${styles.contentBackgroundCover} ${styles.hide}`}></div>
                <div className={props.contentIsOpen ? `${styles.content} ${styles.open}` : styles.content}>
                    <button className={styles.closeButton} onClick={() => props.openContent(false)} aria-label={props.t.close}>
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
