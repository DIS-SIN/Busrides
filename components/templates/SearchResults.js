import Header from '../organisms/Header';
import EpisodeList from '../organisms/EpisodeList';
import TagsList from '../organisms/TagsList';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/SearchResults.module.css';

export default function SearchResults(props) {

    console.log(props.searchResults);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <h1>Searched: {props.searchTerm}, got {props.searchResults.total} results</h1>
            <div className={styles.resultsContainer}>
                <EpisodeList t={props.t} posts={props.searchResults.posts} searchMeta={{
                    total: props.searchResults.total,
                    searchTerm: props.searchResults.searchTerm
                }}/>
                <TagsList t={props.t} posts={props.searchResults.posts}/>
            </div>
            <Footer t={props.t}/>
        </div>
    );
}