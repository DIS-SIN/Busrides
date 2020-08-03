import { useRef, useState } from "react";
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import styles from '../stylesheets/FullSearchBar.module.css';

export default function FullSearchBar(props) {

    const [searchTerm, setSearchTerm] = useState(null);
    const searchInput = useRef(null);

    function clearSearch() {
        searchInput.current.value = null;
        setSearchTerm(null);
    }

    return (
        <div className={styles.searchBar}>
            <input className={styles.input} ref={searchInput} onChange={() => setSearchTerm(searchInput.current.value)}></input>
            <IcomoonReact className={styles.searchIcon} iconSet={iconSet} size={25} icon="search"/>
            {searchTerm ?
                <span className={styles.clearSearch} onClick={clearSearch}>{props.t["Clear search"]}</span>
            : undefined}
        </div>
    );
}