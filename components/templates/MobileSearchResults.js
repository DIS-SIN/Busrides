import { useState } from 'react';
import { ThreeDots } from 'svg-loaders-react'
import PropTypes from 'prop-types';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t, cp_searchResults, cp_settings } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import FullSearchBar from '../molecules/FullSearchBar';
import EpisodeList from '../organisms/EpisodeList';
import TagsList from '../organisms/TagsList';
import SortOptions from '../molecules/SortOptions';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/MobileSearchResults.module.css';

export default function MobileSearchResults(props) {

    const [searchResults, setSearchResults] = useState(props.searchResults);
    const [searchTerm, setSearchTerm] = useState(props.searchTerm)
    const [loading, setLoading] = useState(false);
    const [resultsView, setResultsView] = useState("Episodes");
    const [mobileSortBy, setMobileSortBy] = useState("popularity:desc");
    const [useCompactView, setUseCompactView] = useState(false);

    function changeResultsView(ev) {
        setResultsView(ev.target.getAttribute("data-view"));
    }

    return (
        <div className={styles.mainContainer}>
            <MetaTags title={`${props.t["Searched"]}: ${searchTerm}`} description={`${props.t["Searched"]}: ${searchTerm}, ${props.t["got"]} ${searchResults.total} ${props.t["results"]}`} image={props.settings.url + "thumbnail.jpg"} url={props.settings.url + (props.t.getLocale === "en" ? "" : props.t.getLocale + "/" ) + `search/${encodeURI(searchTerm)}`}/>
            <Header t={props.t} settings={props.settings} hideSearchBar={true}/>
            <div className={styles.resultsPage}>

                <div className={styles.searchNavContainer}>
                    <FullSearchBar t={props.t} setLoading={setLoading} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                    <ul className={styles.resultsNav}>
                        <li className={resultsView === "Episodes" || resultsView === "Sorting" ? styles.active : undefined} data-view={"Episodes"} onClick={changeResultsView}>{props.t["Episodes"]}</li>
                        <li className={resultsView === "Topics" ? styles.active : undefined} data-view={"Topics"} onClick={changeResultsView}>{props.t["Topics"]}</li>
                    </ul>
                </div>

                {loading ?
                    <ThreeDots fill="#ce3f3f" className={styles.loader}/>
                :
                    <div className={styles.resultsContainer}>
                        {resultsView === "Episodes" &&
                            <React.Fragment>
                                <div className={styles.metaBar}>
                                    <p>{props.t["Searched"]}: {searchTerm}, {props.t["got"]} {searchResults.total} {props.t["results"]}</p>
                                    <button data-view={"Sorting"} onClick={changeResultsView}>{props.t["Sorting"]}</button>
                                </div>
                                <EpisodeList t={props.t} posts={searchResults.posts} useCompactView={useCompactView} mobile searchMeta={{
                                    total: searchResults.total,
                                    searchTerm: searchResults.searchTerm,
                                    sortBy: searchResults.sortBy
                                }}/>
                            </React.Fragment>
                        }
                        {resultsView === "Topics" &&
                            <TagsList t={props.t} posts={searchResults.posts} hideTitle/>
                        }
                        {resultsView === "Sorting" &&
                            <React.Fragment>
                                <div className={styles.metaBar}>
                                    <p>{props.t["Searched"]}: {searchTerm}, {props.t["got"]} {searchResults.total} {props.t["results"]}</p>
                                    <button data-view={"Episodes"} onClick={changeResultsView}>{props.t["Done"]}</button>
                                </div>
                                <div className={styles.sortContainer}>
                                    <SortOptions t={props.t} searchTerm={searchResults.searchTerm} setSearchResults={setSearchResults} mobileSortBy={mobileSortBy} setMobileSortBy={setMobileSortBy}/>
                                    <div className={styles.viewPrefContainer}>
                                        <h2>{props.t["View"]}</h2>
                                        <a onClick={() => setUseCompactView(false)}>
                                            <IcomoonReact className={styles.spacer} iconSet={iconSet} size={25} color={!useCompactView ? "#CE3F3F" : undefined} icon="grid-view"/>
                                            Card View
                                        </a>
                                        <a onClick={() => setUseCompactView(true)}>
                                            <IcomoonReact className={styles.spacer} iconSet={iconSet} size={25} color={useCompactView ? "#CE3F3F" : undefined} icon="list-view"/>
                                            List View
                                        </a>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                }

            </div>
            <Footer t={props.t}/>
        </div>
    );
}

MobileSearchResults.propTypes = {
    t: cp_t.isRequired,
    searchResults: cp_searchResults.isRequired,
    searchTerm: PropTypes.string.isRequired,
    settings: cp_settings.isRequired
};