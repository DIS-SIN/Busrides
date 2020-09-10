import { useRef, useState } from "react";
import Router from 'next/router';
import PropTypes from 'prop-types';
import { getSearchResults } from '../../Ghost-API/searchAPI';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t } from '../../helpers/commonProps';
import { getCleanSearchTerm } from '../../helpers/helpers';
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
        Router.replace(`${props.t.getLocalePath}/search/[slug]`, `${props.t.getLocalePath}/search/${getCleanSearchTerm(searchTerm)}`, "shallow");
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

FullSearchBar.propTypes = {
    t: cp_t.isRequired,
    searchTerm: PropTypes.string,
    setLoading: PropTypes.func,
    setSearchResults: PropTypes.func,
    setSearchTerm: PropTypes.func,
    autofocus: PropTypes.bool,
    initialSearch: PropTypes.bool
};