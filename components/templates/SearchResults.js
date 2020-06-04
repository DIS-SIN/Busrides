import Header from '../organisms/Header';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';

export default function SearchResults(props) {

    console.log(props.searchResults);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <h1>Searched: {props.searchTerm}, got {props.searchResults.total} results</h1>
            <EpisodeList t={props.t} posts={props.searchResults.posts} searchMeta={{
                total: props.searchResults.total,
                searchTerm: props.searchResults.searchTerm
            }}/>
            <Footer t={props.t}/>
        </div>
    );
}