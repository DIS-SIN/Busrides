import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import styles from '../stylesheets/Header.module.css';

export default function Header(props) {

    function getHomeUrl() {
        return props.t.getLocale === "en" ? "/" : "/fr";
    }

    function getOppositeLangHomeUrl() {
        return props.t.getOppositeLocale === "en" ? "/" : "/fr";
    }

    function getNavItems() {
        if (props.t.getLocale === "en"){
            return props.settings.navigation.filter(navItem => !navItem.url.includes("/fr/"));
        }
        return props.settings.navigation.filter(navItem => navItem.url.includes("/fr/"));
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <ul className={styles.navItems}>
                    <li>
                        <a href={getHomeUrl()}>
                            <img className={styles.logo} src={props.settings.logo} alt={props.settings.title}/>
                        </a>
                    </li>
                    {getNavItems().map(navItem => (
                        <li key={navItem.url}>
                            <a className={styles.navItem} href={navItem.url}>{navItem.label}</a>
                        </li>
                    ))}
                    <li>
                        <a className={styles.navItem} href={getHomeUrl()}>{props.t["Topics"]}</a>
                    </li>
                </ul>
                <ul className={styles.navItems}>
                    <li>
                        <a className={styles.navItem}>
                            <IcomoonReact iconSet={iconSet} size={18} icon="search"/>
                        </a>
                    </li>
                    <li>
                        <a className={styles.navItem} href={getOppositeLangHomeUrl()}>{props.t.getOppositeLocale.toUpperCase()}</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}