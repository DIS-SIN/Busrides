import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { cp_t } from '../../helpers/commonProps';
import styles from './NavButton.module.css';

export default function NavButton(props) {

    return (
        <div className={styles.navButton}>
            <Link href={props.path}>
                <p>{props.t[props.text]}</p>
            </Link>
        </div>    
    );
}

NavButton.propTypes = {
    t: cp_t.isRequired,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};