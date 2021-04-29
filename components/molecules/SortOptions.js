import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cp_t } from '../../helpers/commonProps';
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
        if (props.setMobileSortBy){
            props.setMobileSortBy(ev.target.value);
        }
    }

    function checkDefault(value) {
        if (props.mobileSortBy){
            return props.mobileSortBy === value ? true : false;
        }
        else if (value === "popularity:desc"){
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div>
            <h2 className={styles.title}>{props.t["Sort By"]}</h2>
            <div className={styles.radioButtons} onChange={changeSortMethod}>
            <label className={styles.radioButton}>{props.t["Top Results"]}
                    <input type="radio" value="popularity:desc" name="sorting" defaultChecked={checkDefault("popularity:desc")}/>
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.radioButton}>{props.t["Recently Posted"]}
                    <input type="radio" value="published_at:desc" name="sorting" defaultChecked={checkDefault("published_at:desc")}/>
                    <span className={styles.checkmark}></span>
                </label>
            </div>
        </div>
    );
}

SortOptions.propTypes = {
    t: cp_t.isRequired,
    searchTerm: PropTypes.string.isRequired,
    setSearchResults: PropTypes.func.isRequired,
    setMobileSortBy: PropTypes.func,
    mobileSortBy: PropTypes.string
};