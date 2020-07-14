import React from 'react';
import Link from 'next/link';
import styles from './NavButton.module.css';

export default function NavButton(props) {

    return (
        <div className={styles.navButton}>
            <Link className={props.tagClass} href={props.path}>
                <p>{props.t[props.text]}</p>
            </Link>
        </div>    
    );
}