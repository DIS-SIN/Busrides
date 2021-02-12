import Home from '../../components/templates/Home';
import { getPosts, getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import dictionary from '../../locales/fr';

export default function Index(props) {
    return (
        <Home t={dictionary} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions} settings={props.settings}/>
    );
}

Index.getInitialProps = async function({req}) {
    const apiOptions = {
        page: 1,
        limit: 10,
        include: "tags,authors",
        filter: `tag:${dictionary.getGhostLocaleTag}+tag:-hash-learning-path`
    };
    const posts = await getPosts(apiOptions);
    const settings = await getSettings();

	return {
        posts,
        postsMeta: posts.meta,
        apiOptions,
        settings,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
	};
};
