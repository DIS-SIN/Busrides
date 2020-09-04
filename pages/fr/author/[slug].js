import { getAuthor, getPosts, getSettings } from '../../../Ghost-API/contentAPI';
import { getUserAgent } from '../../../helpers/helpers';
import Author from '../../../components/templates/Author';
import dictionary from '../../../locales/fr';
import ErrorPage from '../../_error';

export default function AuthorPage(props) {

    if (props.error){
        return <ErrorPage errorCode={404} />
    }

    return (
        <Author t={dictionary} author={props.author} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions} settings={props.settings}/>
    );
}

AuthorPage.getInitialProps = async function({query, res, req}) {
    const author = await getAuthor(query.slug);

    if (!author){
        res.statusCode = 404
        return {error: true};
    }

    const apiOptions = {
        page: 1,
        limit: 10,
        include: "tags,authors",
        filter: `author:${query.slug}+tag:${dictionary.getGhostLocaleTag}`
    };
    const posts = await getPosts(apiOptions);
    const settings = await getSettings();

	return {
        author,
        posts,
        apiOptions,
        postsMeta: posts.meta,
        settings,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
	};
};