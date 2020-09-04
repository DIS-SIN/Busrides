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
import styles from '../stylesheets/SearchResults.module.css';

export default function SearchResults(props) {

    const [searchResults, setSearchResults] = useState(props.searchResults);
    const [searchTerm, setSearchTerm] = useState(props.searchTerm)
    const [loading, setLoading] = useState(false);
    const [useCompactView, setUseCompactView] = useState(true);

    console.log(props);

    return (
        <div className={styles.mainContainer}>
            <MetaTags title={`${props.t["Searched"]}: ${searchTerm}`} description={`${props.t["Searched"]}: ${searchTerm}, ${props.t["got"]} ${searchResults.total} ${props.t["results"]}`} image={props.settings.url + "thumbnail.jpg"} url={props.settings.url + (props.t.getLocale === "en" ? "" : props.t.getLocale + "/" ) + `search/${encodeURI(searchTerm)}`}/>
            <Header t={props.t} settings={props.settings} hideSearchBar={true}/>
            <div className={styles.resultsPage}>
                <FullSearchBar t={props.t} setLoading={setLoading} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                {loading ?
                    <ThreeDots fill="#ce3f3f" className={styles.loader}/>
                :
                <div className={styles.resultsContainer}>
                    <div className={styles.mainColumn}>
                        <div className={styles.titleContainer}>
                            <h2 className={styles.title}>{props.t["Episodes"]}</h2>
                            <p className={styles.searchResultsInfo}>{props.t["Searched"]}: {searchTerm}, {props.t["got"]} {searchResults.total} {props.t["results"]}</p>
                            <div className={styles.viewPrefContainer}>
                                {props.t["View"]}
                                <a onClick={() => setUseCompactView(false)}>
                                    <IcomoonReact className={styles.spacer} iconSet={iconSet} size={20} color={!useCompactView ? "#CE3F3F" : undefined} icon="grid-view"/>
                                </a>
                                <a onClick={() => setUseCompactView(true)}>
                                    <IcomoonReact iconSet={iconSet} size={20} color={useCompactView ? "#CE3F3F" : undefined} icon="list-view"/>
                                </a>
                            </div>
                        </div>
                        <EpisodeList t={props.t} posts={searchResults.posts} useCompactView={useCompactView} searchMeta={{
                            total: searchResults.total,
                            searchTerm: searchResults.searchTerm,
                            sortBy: searchResults.sortBy
                        }}/>
                    </div>
                    <div className={styles.sidePanel}>
                        <SortOptions t={props.t} searchTerm={searchResults.searchTerm} setSearchResults={setSearchResults}/>
                        <TagsList t={props.t} posts={searchResults.posts}/>
                    </div>
                </div>
                }
                
                
            </div>
            <Footer t={props.t}/>
        </div>
    );
}

SearchResults.propTypes = {
    t: cp_t.isRequired,
    searchResults: cp_searchResults.isRequired,
    searchTerm: PropTypes.string.isRequired,
    settings: cp_settings.isRequired
};