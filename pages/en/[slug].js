import { getPost, getRecommendedPosts, getTags, getSettings } from '../../Ghost-API/contentAPI';
import Episode from '../../components/templates/Episode';
import dictionary from '../../locales/en';

export default function Post(props) {

    return (
        <Episode t={dictionary} post={props.post} tags={props.tags} settings={props.settings} recommendedPosts={props.recommendedPosts}/>
    );
}

Post.getInitialProps = async function({query}) {
    const post = await getPost(query.slug);
    const tags = await getTags(dictionary.getTopicSlugs);
    const settings = await getSettings();
    const recommendedPosts = await getRecommendedPosts(dictionary.getGhostLocaleTag, post);

	return {
        post,
        tags,
        settings,
        recommendedPosts
	};
};