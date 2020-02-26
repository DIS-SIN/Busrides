import { getPosts, getTags, getSettings } from '../../Ghost-API/contentAPI';
import Author from '../../components/templates/Author';
import dictionary from '../../locales/en';

export default function Post(props) {

    return (
        <Author t={dictionary} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions} tags={props.tags} settings={props.settings}/>
    );
}

Post.getInitialProps = async function({query}) {
    const apiOptions = {
        page: 1,
        limit: 10,
        include: "tags,authors",
        filter: `author:${query.slug}+tag:${dictionary.getGhostLocaleTag}`
    };
    const posts = await getPosts(apiOptions);
    const tags = await getTags(dictionary.getTopicSlugs);
    const settings = await getSettings();

	return {
        posts,
        apiOptions,
        postsMeta: posts.meta,
        tags,
        settings
	};
};