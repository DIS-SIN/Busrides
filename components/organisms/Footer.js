import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import styles from '../stylesheets/Footer.module.css';

export default function Footer(props) {

    return (
        <div className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.row}>
                    <span>{props.t["Busrides"]} © 2020 • </span>
                    <a href={props.t.getAboutDALink} target="_blank">{props.t["What is the Digital Academy?"]}</a>
                </p>
                <a className={styles.row} href={props.t.getDATwitter} target="_blank">
                    <IcomoonReact iconSet={iconSet} size={16} icon="twitter"/>
                </a>
                <a className={styles.row} href="https://da-an.us3.list-manage.com/subscribe?u=9e5810d743bf898c302d3c312&id=bbc8bab3e7" target="_blank">{props.t["Subscribe to our newsletter"]}</a>
            </div>
        </div>
    );
}