import styles from '../stylesheets/Header.module.css';

export default function Header(props) {

    function getHomeUrl() {
        return props.t.getLocale === "en" ? "/" : "/fr";
    }

    function getNavItems() {
        if (props.t.getLocale === "en"){
            return props.settings.navigation.filter(navItem => !navItem.url.includes("/fr/"));
        }
        return props.settings.navigation.filter(navItem => navItem.url.includes("/fr/"));
    }

    return (
        <div className={styles.header}>
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
        </div>
    );
}