import { getPost, getPosts, getTags, getSettings } from '../../Ghost-API/contentAPI';
import Episode from '../../components/templates/Episode';
import dictionary from '../../locales/fr';
import ErrorPage from '../_error';

export default function Post(props) {

    if (props.error){
        return <ErrorPage errorCode={404} />
    }
    
    return (
        <Episode t={dictionary} post={props.post} tags={props.tags} settings={props.settings} recommendedPosts={props.recommendedPosts}/>
    );
}

Post.getInitialProps = async function({query, res}) {
    const post = await getPost(query.slug);

    if (!post){
        res.statusCode = 404
        return {error: true};
    }

    const tags = await getTags(dictionary.getTopicSlugs);
    const settings = await getSettings();
    const recommendedPosts = await getPosts({
        limit: 3,
        filter: `tag:${dictionary.getGhostLocaleTag}+tags:[${Array.from(post.tags, tag => tag.slug)}]+id:-${post.id}`,
        include: "tags,authors",
    });

	return {
        post,
        tags,
        settings,
        recommendedPosts
	};
};