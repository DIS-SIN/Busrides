import Home from '../../components/templates/Home';
import { getPosts, getTags, getSettings } from '../../Ghost-API/contentAPI';
import dictionary from '../../locales/fr';

export default function Index(props) {
    return (
        <Home t={dictionary} posts={props.posts} apiOptions={props.apiOptions} tags={props.tags} settings={props.settings}/>
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
    const tags = await getTags(dictionary.getTopicSlugs);
    const settings = await getSettings();

	return {
        posts,
        apiOptions,
        tags,
        settings,
        locale: dictionary.getLocale
	};
};
