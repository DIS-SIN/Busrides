import { useState } from 'react';
import Header from '../organisms/Header';
import EpisodeList from '../organisms/EpisodeList';
import TagsList from '../organisms/TagsList';
import SortOptions from '../molecules/SortOptions';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/SearchResults.module.css';

export default function SearchResults(props) {

    const [searchResults, setSearchResults]= useState(props.searchResults);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <h1>Searched: {props.searchTerm}, got {searchResults.total} results</h1>
            <div className={styles.resultsContainer}>
                <div className={styles.mainColumn}>
                    <h2 className={styles.title}>{props.t["Episodes"]}</h2>
                    <EpisodeList t={props.t} posts={searchResults.posts} searchMeta={{
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