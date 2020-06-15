import { useState, useEffect } from 'react';
import { getSearchResults } from '../../Ghost-API/searchAPI';
import styles from '../stylesheets/SortOptions.module.css';

export default function SortOptions(props) {

    const [sortBy, setSortBy] = useState();

    useEffect(() => {
        // If here prevents function from running on initial render
        if (sortBy){
            getSortedResults();
        }
    },[sortBy]);

    async function getSortedResults() {
        let sortedResults = await getSearchResults(props.searchTerm, props.t.getGhostLocaleTag, 0, sortBy);
        props.setSearchResults(sortedResults);
    }

    function changeSortMethod(ev) {
        setSortBy(ev.target.value);
    }

    return (
        <div>
            <h2 className={styles.title}>{props.t["Sort By"]}</h2>
            <div className={styles.radioButtons} onChange={changeSortMethod}>
                <label className={styles.radioButton}>Most Popular
                    <input type="radio" value="popularity:desc" name="sorting" defaultChecked/>
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.radioButton}>Recently Posted
                    <input type="radio" value="published_at:desc" name="sorting"/>
                    <span className={styles.checkmark}></span>
                </label>
            </div>
        </div>
    );
}