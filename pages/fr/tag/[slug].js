import { getTag, getPosts, getSettings } from '../../../Ghost-API/contentAPI';
import Tag from '../../../components/templates/Tag';
import dictionary from '../../../locales/fr';
import ErrorPage from '../../_error';

export default function TagPage(props) {

    if (props.error){
        return <ErrorPage errorCode={404} />
    }

    return (
        <Tag t={dictionary} tag={props.tag} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions} settings={props.settings}/>
    );
}

TagPage.getInitialProps = async function({query, res}) {
    const tag = await getTag(query.slug);
    const apiOptions = {
        page: 1,
        limit: 10,
        include: "tags,authors",
        filter: `tag:${query.slug}+tag:${dictionary.getGhostLocaleTag}`
    };
    const posts = await getPosts(apiOptions);

    if (!tag || posts.length === 0){
        res.statusCode = 404
        return {error: true};
    }

    const settings = await getSettings();

	return {
        tag,
        posts,
        apiOptions,
        postsMeta: posts.meta,
        settings,
        locale: dictionary.getLocale
	};
};