import Home from '../../components/templates/Home';
import { getPosts, getSettings } from '../../Ghost-API/contentAPI';
import dictionary from '../../locales/fr';

export default function Index(props) {
    return (
        <Home t={dictionary} posts={props.posts} apiOptions={props.apiOptions} settings={props.settings}/>
    );
}

Index.getInitialProps = async function() {
    const apiOptions = {
        page: 1,
        limit: 10,
        include: "tags,authors",
        filter: `tag:${dictionary.getGhostLocaleTag}`
    };
    const posts = await getPosts(apiOptions);
    const settings = await getSettings();

	return {
        posts,
        apiOptions,
        settings,
        locale: dictionary.getLocale
	};
};
