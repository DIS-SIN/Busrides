import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import styles from '../stylesheets/Header.module.css';
import { useState, useRef } from "react";

export default function Header(props) {

    const [isMenuOpen, openMenu] = useState(false);

    const searchInput = useRef(null);

    function getHomeUrl() {
        return props.t.getLocale === "en" ? "/" : "/fr";
    }

    function getOppositeLangHomeUrl() {
        return props.t.getOppositeLocale === "en" ? "/" : "/fr";
    }

    function getOppositeLangUrl() {
        let current = useRouter().asPath;
        if (current === "/" || current === "/fr" || current.includes("/tag/")){
            return getOppositeLangHomeUrl();
        }
        if (current.includes("/author/") || current.includes("/search/") || current.includes("/opencall")){
            return current.includes("/fr/") ? "/" + current.substr(4) : "/fr" + current;
        }
        current = current.replace(`/${props.t.getLocale}/`, `/${props.t.getOppositeLocale}/`);
        current = current.replace(`-${props.t.getLocale}`, `-${props.t.getOppositeLocale}`);
        current = current.replace(`/${props.t.getLocale}-`, `/${props.t.getOppositeLocale}-`);
        return current;
    }

    function search() {
        if (searchInput.current.value.match(/([A-Za-z0-9])/)){
            Router.push(`${props.t.getLocalePath}/search/${searchInput.current.value}`);
        }
    }

    function getNavItems() {
        if (props.t.getLocale === "en"){
            return props.settings.navigation.filter(navItem => !navItem.url.includes("/fr/"));
        }
        return props.settings.navigation.filter(navItem => navItem.url.includes("/fr/"));
    }

    function toggleMenu() {
        openMenu(!isMenuOpen);
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.menuIcon} onClick={toggleMenu}>
                    <IcomoonReact iconSet={iconSet} size={18} icon="menu"/>
                </div>
                <Link href={getHomeUrl()}>
                    <img className={styles.logo} src={props.settings.logo} alt={props.settings.title}/>
                </Link>
                <ul className={styles.navItems}>
                    {getNavItems().map(navItem => (
                        <li key={navItem.url}>
                            <Link href={navItem.url}>
                                <a className={styles.navItem}>{navItem.label}</a>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a className={styles.navItem}>{props.t["Topics"]}</a>
                    </li>
                </ul>
                <ul className={styles.navItems}>
                    <li className={styles.searchBar}>
                        <input className={styles.searchBar} ref={searchInput}></input>
                        <a className={styles.navItem} onClick={search}>
                            <IcomoonReact iconSet={iconSet} size={18} icon="search"/>
                        </a>
                    </li>
                    <li>
                        <Link href={getOppositeLangUrl()}>
                            <a className={styles.navItem}>{props.t.getOppositeLocale.toUpperCase()}</a>
                        </Link>
                    </li>
                </ul>
            </div>
            { isMenuOpen ? 
                <div className={styles.mobileMenu}>
                    <div className={styles.closeButton} onClick={toggleMenu}>
                        <IcomoonReact iconSet={iconSet} size={10} icon="close"/>
                    </div>
                    <ul className={styles.navItems}>
                        {getNavItems().map(navItem => (
                            <li key={navItem.url}>
                                <Link href={navItem.url}>
                                    <a className={styles.navItem}>{navItem.label}</a>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a className={styles.navItem}>{props.t["Topics"]}</a>
                        </li>
                        <li>
                            <Link href={getOppositeLangHomeUrl()}>
                                <a className={styles.navItem}>{props.t.getOppositeLocale.toUpperCase()}</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            : undefined}
            
        </div>
    );
}