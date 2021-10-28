import { useState, useRef } from "react";
import PropTypes from 'prop-types';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useWindowWidth } from '@react-hook/window-size';
import AccessabilityMenu from '../molecules/AccessabilityMenu';
import MobileSearchModal from '../molecules/MobileSearchModal';
import { cp_t, cp_settings } from '../../helpers/commonProps';
import { getCleanSearchTerm } from '../../helpers/helpers';
import styles from '../stylesheets/Header.module.css';

export default function Header(props) {

    const [isMenuOpen, openMenu] = useState(false);
    const [isSearchMenuOpen, openSearchMenu] = useState(false);
    const width = useWindowWidth();
    const searchInput = useRef(null);

    function getHomeUrl() {
        return props.t.getLocale === "en" ? "/" : "/fr";
    }

    function getOppositeLangHomeUrl() {
        return props.t.getOppositeLocale === "en" ? "/" : "/fr";
    }

    function getOppositeLangUrl() {
        let current = useRouter().asPath;
        if (current === "/" || current === "/fr" || current === "/fr/"){
            return getOppositeLangHomeUrl();
        }
        if (current.includes("/author/") || current.includes("/search/") || current.includes("/parking-lot")){
            return current.includes("/fr/") ? "/" + current.substr(4) : "/fr" + current;
        }
        if (current.includes("/tag/")){
            current = current.replace(`/${props.t.getLocale}-`, `/${props.t.getOppositeLocale}-`);
            return current.includes("/fr/") ? current.substr(3) : "/fr" + current;
        }
        current = current.replace(`/${props.t.getLocale}/`, `/${props.t.getOppositeLocale}/`);
        current = current.replace(`-${props.t.getLocale}`, `-${props.t.getOppositeLocale}`);
        current = current.replace(`/${props.t.getLocale}-`, `/${props.t.getOppositeLocale}-`);
        return current;
    }

    function getLocaleThreeChar() {
        if (props.t.getLocale === "en") {
            return "eng";
        }
        return "fra";
    }

    function cleanUrl(url) {
        if (url === "https://www.busrides-trajetsenbus.ca" || url === "https://busrides.ghost.io" || url === "https://busrides-trajetsenbus.csps-efpc.gc.ca"){
            return "/";
        }
        return url.replace(/https:\/\/www.busrides-trajetsenbus.ca|https:\/\/busrides.ghost.io|https:\/\/busrides-trajetsenbus.csps-efpc.gc.ca/, "");
    }

    function search() {
        if (width <= 800){
            openSearchMenu(true);
            return;
        }
        let searchTerm = searchInput.current.value;
        if (searchTerm.match(/([A-Za-z0-9])/)){
            Router.push(`${props.t.getLocalePath}/search/[slug]`, `${props.t.getLocalePath}/search/${getCleanSearchTerm(searchTerm)}`);
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
        <header>
            <div id="wb-bnr" className="container">
                <div className="row">
                    <section id="wb-lng" className="col-xs-3 col-sm-12 pull-right text-right">
                        <h2 className="wb-inv">Language selection</h2>
                        <ul className="list-inline mrgn-bttm-0">
                            <li>
                                <Link href={getOppositeLangUrl()}>
                                    <a lang={props.t.getOppositeLocale} hrefLang={props.t.getOppositeLocale} title={props.t.getOppositeLocaleFull}>
                                        <span className="hidden-xs">{props.t.getOppositeLocaleFull}</span>
                                        <abbr title={props.t.getOppositeLocaleFull} className="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase">{props.t.getOppositeLocale}</abbr>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <div className="brand col-xs-9 col-sm-5 col-md-4" property="publisher" resource="#wb-publisher" typeof="GovernmentOrganization">
                        <a href={`https://www.canada.ca/${props.t.getLocale}.html`} property="url">
                            <img src={`/theme/GCWeb/assets/sig-blk-${props.t.getLocale}.svg`} alt={props.t["Logo Title"]} property="logo" /><span className="wb-inv" property="name" dangerouslySetInnerHTML={{ __html: props.t["Menu Title"] }}></span>
                        </a>
                        <meta property="areaServed" typeof="Country" content="Canada" />
                        <link property="logo" href="/theme/GCWeb/assets/wmms-blk.svg" />
                    </div>
                    <section id="wb-srch" className="col-lg-offset-4 col-md-offset-4 col-sm-offset-2 col-xs-12 col-sm-5 col-md-4">
                        <h2>{props.t["Search"]}</h2>
                        <form action={props.t["Search Action"]} method="get" name="cse-search-box" role="search">
                            <div className="form-group wb-srch-qry">
                                <label htmlFor="wb-srch-q" className="wb-inv">{props.t["Search Placeholder"]}</label>
                                <input id="wb-srch-q" list="wb-srch-q-ac" className="wb-srch-q form-control" name="q" type="search" size="34" maxLength="170" placeholder={props.t["Search Placeholder"]} />
                                <datalist id="wb-srch-q-ac">
                                </datalist>
                            </div>
                            <div className="form-group submit">
                                <button type="submit" id="wb-srch-sub" className="btn btn-primary btn-small" name="wb-srch-sub"><span className="glyphicon-search glyphicon"></span><span className="wb-inv">{props.t["Search"]}</span></button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
            <nav className="gcweb-menu" typeof="SiteNavigationElement">
                <div className="container">
                    <h2 className="wb-inv">{props.t["Menu"]}</h2>
                    <button type="button" aria-haspopup="true" aria-expanded="false" dangerouslySetInnerHTML={{ __html: props.t["Menu Title"] }}></button>
                    <ul role="menu" aria-orientation="vertical" data-ajax-replace={`https://wet-boew.github.io/themes-dist/GCWeb/ajax/sitemenu-v5-${props.t.getLocale}.html`}>
                        {}
                    </ul>
                </div>
            </nav>
            <nav id="wb-bc" property="breadcrumb">
                <h2>{props.t["You are here"]}</h2>
                <div className="container">
                    <ol className="breadcrumb">
                        <li><a href={`https://www.canada.ca/${props.t.getLocale}.html`}>{props.t["Canada.ca"]}</a></li>
                        <li><a href={`https://csps-efpc.gc.ca/index-${getLocaleThreeChar()}.aspx`}>{props.t["Canada School of Public Service"]}</a></li>
                        <li><a href={`https://csps-efpc.gc.ca/catalogue/topics-${getLocaleThreeChar()}.aspx`}>{props.t["Learning catalogue"]}</a></li>
                        <li><a href={`https://csps-efpc.gc.ca/tools/index-${getLocaleThreeChar()}.aspx`}>{props.t["Learning tools"]}</a></li>
                        <li><a href={`https://csps-efpc.gc.ca/tools/blogs/index-${getLocaleThreeChar()}.aspx`}>{props.t["Blogs"]}</a></li>
                    </ol>
                </div>
            </nav>
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
                                <Link href={cleanUrl(navItem.url)}>
                                    <a className={styles.navItem}>{navItem.label}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.navItems}>
                        <li className={styles.searchBar} style={props.hideSearchBar ? {zIndex: -1} : undefined}>
                            <input className={styles.searchBar} ref={searchInput} aria-label={props.t["Search Busrides"]} placeholder={props.t["Search Busrides"]} onKeyDown={e => e.key === "Enter" ? search() : undefined}></input>
                            <a className={styles.navItem} onClick={search}>
                                <IcomoonReact iconSet={iconSet} size={18} icon="search"/>
                            </a>
                        </li>
                        <li className={styles.accessabilityButton}>
                            <AccessabilityMenu t={props.t}/>
                        </li>
                    </ul>
                    {isSearchMenuOpen &&
                        <MobileSearchModal t={props.t} openSearchMenu={openSearchMenu}/>
                    }
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
                                <Link href={getOppositeLangHomeUrl()}>
                                    <a className={styles.navItem}>{props.t.getOppositeLocale.toUpperCase()}</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                : undefined}

            </div>
        </header>
    );
}

Header.propTypes = {
    t: cp_t.isRequired,
    hideSearchBar: PropTypes.bool,
    settings: cp_settings.isRequired
};
