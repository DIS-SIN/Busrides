import Header from '../organisms/Header';
import EpisodeList from '../organisms/EpisodeList';
import TagsList from '../organisms/TagsList';
import SortOptions from '../molecules/SortOptions';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/SearchResults.module.css';

export default function SearchResults(props) {

    console.log(props.searchResults);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <h1>Searched: {props.searchTerm}, got {props.searchResults.total} results</h1>
            <div className={styles.resultsContainer}>
                <div className={styles.mainColumn}>
                    <EpisodeList t={props.t} posts={props.searchResults.posts} searchMeta={{
                        total: props.searchResults.total,
                        searchTerm: props.searchResults.searchTerm
                    }}/>
                </div>
                <div className={styles.sidePanel}>
                    <SortOptions t={props.t}/>
                    <TagsList t={props.t} posts={props.searchResults.posts}/>
                </div>
            </div>
            <Footer t={props.t}/>
        </div>
    );
}