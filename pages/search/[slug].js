import { useEffect, useState } from 'react';
import Bowser from "bowser";
import { useWindowWidth } from '@react-hook/window-size';
import SearchResults from '../../components/templates/SearchResults';
import MobileSearchResults from '../../components/templates/MobileSearchResults';
import { getTags, getSettings } from '../../Ghost-API/contentAPI';
import { getSearchResults } from '../../Ghost-API/searchAPI';
import dictionary from '../../locales/en';
import ErrorPage from '../_error';

export default function Search(props) {

    const SearchResultsPage = <SearchResults t={dictionary} settings={props.settings} searchTerm={props.searchTerm} searchResults={props.searchResults}/>;
    const MobileSearchResultsPage = <MobileSearchResults t={dictionary} settings={props.settings} searchTerm={props.searchTerm} searchResults={props.searchResults}/>;

    const [resultsPage, setResultsPage] = useState(props.platform === "desktop" ? SearchResultsPage : MobileSearchResultsPage);
    const width = useWindowWidth();

    useEffect(() => {
        if (width <= 800 && resultsPage != MobileSearchResultsPage){
            setResultsPage(MobileSearchResultsPage);
        }
        else if (width > 800 && resultsPage != SearchResultsPage){
            setResultsPage(SearchResultsPage);
        }
    },[width]);

    if (props.error){
        return <ErrorPage errorCode={404} />
    }

    return resultsPage;
    
}

Search.getInitialProps = async function({query, req}) {

    let platform = Bowser.parse(req.headers["user-agent"]).platform.type;

    let searchTerm = decodeURI(query.slug);

    let searchResults = await getSearchResults(searchTerm, dictionary.getGhostLocaleTag);

    let settings = await getSettings();
    let tags = await getTags(dictionary.getTopicSlugs);

	return {
        platform,
        searchTerm,
        searchResults,
        settings,
        tags
    };
};