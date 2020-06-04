import SearchResults from '../../../components/templates/SearchResults';
import { getTags, getSettings } from '../../../Ghost-API/contentAPI';
import { getSearchResults } from '../../../Ghost-API/searchAPI';
import dictionary from '../../../locales/fr';
import ErrorPage from '../../_error';

export default function Search(props) {

    if (props.error){
        return <ErrorPage errorCode={404} />
    }

    return (
        <SearchResults t={dictionary} settings={props.settings} searchTerm={props.searchTerm} searchResults={props.searchResults}/>
    );
}

Search.getInitialProps = async function({query, res}) {

    let searchTerm = decodeURI(query.slug);

    let searchResults = await getSearchResults(searchTerm, dictionary.getGhostLocaleTag);

    let settings = await getSettings();
    let tags = await getTags(dictionary.getTopicSlugs);

	return {
        searchTerm,
        searchResults,
        settings,
        tags
    };
};