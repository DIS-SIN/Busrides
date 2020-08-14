import { useRef, useState } from "react";
import Router from 'next/router';
import { getSearchResults } from '../../Ghost-API/searchAPI';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { getCleanSearchTerm } from '../../helpers';
import styles from '../stylesheets/FullSearchBar.module.css';

export default function FullSearchBar(props) {

    const [searchTerm, setSearchTerm] = useState(props.searchTerm);
    const searchInput = useRef(null);

    function clearSearch() {
        searchInput.current.value = null;
        setSearchTerm(null);
    }

    async function search() {
        if (props.initialSearch){
            initialSearch();
            return;
        }
        props.setLoading(true);
        let cleanSearchTerm = getCleanSearchTerm(searchTerm);
        history.pushState("", `${props.t["Searched"]}: ${cleanSearchTerm}`, cleanSearchTerm);
        let searchResults = await getSearchResults(cleanSearchTerm, props.t.getGhostLocaleTag);
        props.setSearchResults(searchResults);
        props.setSearchTerm(cleanSearchTerm);
        props.setLoading(false);
    }

    function initialSearch() {
        if (searchTerm.match(/([A-Za-z0-9])/)){
            Router.push(`${props.t.getLocalePath}/search/[slug]`, `${props.t.getLocalePath}/search/${getCleanSearchTerm(searchTerm)}`);
        }
    }

    return (
        <div className={styles.searchBar}>
            <input className={styles.input} ref={searchInput} defaultValue={searchTerm} placeholder={props.t["Search Busrides"]} aria-label={props.t["Search Busrides"]} onKeyDown={e => e.key === "Enter" ? search() : undefined} onChange={() => setSearchTerm(searchInput.current.value)} autoFocus={props.autofocus ? true : false}></input>
            <div onClick={search}>
                <IcomoonReact className={styles.searchIcon} iconSet={iconSet} size={25} icon="search"/>
            </div>
            {searchTerm ?
                <span className={styles.clearSearch} onClick={clearSearch}>{props.t["Clear search"]}</span>
            : undefined}
        </div>
    );
}