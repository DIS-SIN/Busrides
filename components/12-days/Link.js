import React from 'react';
import styles from './Link.module.scss';

export default function Link(props) {

    return (
        <a href={props.data.url} target="_blank" className={styles.link}>
            <img src={props.data.image} alt={props.data.title} />
            <div>
                <h3>{props.data.title}</h3>
                <p>{props.data.description}</p>
                <span>{props.data.domain}</span>
            </div>
        </a>
    );
}
