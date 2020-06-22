import { useState } from 'react';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import Header from '../organisms/Header';
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
            <h1>Searched: {props.searchTerm}, got {searchResults.total} results</h1>
            <div className={styles.resultsContainer}>
                <div className={styles.mainColumn}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{props.t["Episodes"]}</h2>
                        <div className={styles.viewPrefContainer}>
                            View
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