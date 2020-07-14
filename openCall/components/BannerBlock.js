import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './BannerBlock.module.css';

export default function BannerBlock(props) {

    return (
        <div className={styles.bannerBlock} style={props.colors}>
            <div className={styles.content}>
                <div className={styles.markdown}>
                    <ReactMarkdown source={props.markdown}></ReactMarkdown>
                    {props.children}
                </div>
                {props.image ?
                    <img src={props.image.src} alt={props.image.altText}/>
                : undefined}
            </div>
        </div>
    );
}