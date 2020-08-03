import { useState } from 'react';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import Header from '../organisms/Header';
import FullSearchBar from '../molecules/FullSearchBar';
import EpisodeList from '../organisms/EpisodeList';
import TagsList from '../organisms/TagsList';
import SortOptions from '../molecules/SortOptions';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/SearchResults.module.css';

export default function SearchResults(props) {

    const [searchResults, setSearchResults]= useState(props.searchResults);
    const [useCompactView, setUseCompactView] = useState(true);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <FullSearchBar t={props.t}/>
            <div className={styles.resultsContainer}>
                <div className={styles.mainColumn}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{props.t["Episodes"]}</h2>
                        <p className={styles.searchResultsInfo}>{props.t["Searched"]}: {props.searchTerm}, {props.t["got"]} {searchResults.total} {props.t["results"]}</p>
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
            <Footer t={props.t}/>
        </div>
    );
}