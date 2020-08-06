import { useState } from 'react';
import { ThreeDots } from 'svg-loaders-react'
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
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
    const [useCompactView, setUseCompactView] = useState(false);

    function changeResultsView(ev) {
        setResultsView(ev.target.getAttribute("data-view"));
    }

    return (
        <div className={styles.mainContainer}>
            <Header t={props.t} settings={props.settings} hideSearchBar={true}/>
            <div className={styles.resultsPage}>
                <FullSearchBar t={props.t} setLoading={setLoading} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                <ul className={styles.resultsNav}>
                    <li className={resultsView === "Episodes" || resultsView === "Sorting" ? styles.active : undefined} data-view={"Episodes"} onClick={changeResultsView}>{props.t["Episodes"]}</li>
                    <li className={resultsView === "Topics" ? styles.active : undefined} data-view={"Topics"} onClick={changeResultsView}>{props.t["Topics"]}</li>
                </ul>

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
                                <EpisodeList t={props.t} posts={searchResults.posts} useCompactView={useCompactView} searchMeta={{
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
                                <div className={styles.viewPrefContainer}>
                                    {props.t["View"]}
                                    <a onClick={() => setUseCompactView(false)}>
                                        <IcomoonReact className={styles.spacer} iconSet={iconSet} size={20} color={!useCompactView ? "#CE3F3F" : undefined} icon="grid-view"/>
                                    </a>
                                    <a onClick={() => setUseCompactView(true)}>
                                        <IcomoonReact iconSet={iconSet} size={20} color={useCompactView ? "#CE3F3F" : undefined} icon="list-view"/>
                                    </a>
                                </div>
                                <SortOptions t={props.t} searchTerm={searchResults.searchTerm} setSearchResults={setSearchResults}/>
                                <button data-view={"Episodes"} onClick={changeResultsView}>{props.t["Done"]}</button>
                            </React.Fragment>
                        }
                    </div>
                }
                                
            </div>
            <Footer t={props.t}/>
        </div>
    );
}