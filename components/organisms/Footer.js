import PropTypes from 'prop-types';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t } from '../../helpers/commonProps';
import styles from '../stylesheets/Footer.module.css';

export default function Footer(props) {

    return (
        <div className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.row}>
                    <span>{props.t["Busrides"]} © 2020&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                    <a href={props.t.getAboutDALink} target="_blank" rel="noopener">{props.t["What is the Digital Academy?"]}</a>
                </p>
                <a className={styles.row} href={props.t.getDATwitter} aria-label={props.t["Digital Academy Twitter"]} target="_blank" rel="noopener">
                    <IcomoonReact iconSet={iconSet} size={16} icon="twitter"/>
                </a>
                <a className={styles.row} href="https://da-an.us3.list-manage.com/subscribe?u=9e5810d743bf898c302d3c312&id=bbc8bab3e7" target="_blank" rel="noopener">{props.t["Subscribe to our newsletter"]}</a>
            </div>
        </div>
    );
}

Footer.propTypes = {
    t: cp_t.isRequired
};