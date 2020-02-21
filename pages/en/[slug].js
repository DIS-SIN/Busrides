import { useRouter } from 'next/router';
import { getPost, getTags, getSettings } from '../../Ghost-API/contentAPI';
import Episode from '../../components/templates/Episode';
import dictionary from '../../locales/en';

export default function Post(props) {

    return (
        <Episode t={dictionary} post={props.post} tags={props.tags} settings={props.settings}/>
    );
}

Post.getInitialProps = async function({query}) {
    const post = await getPost(query.slug);
    const tags = await getTags(dictionary.getTopicSlugs);
    const settings = await getSettings();

	return {
        post,
        tags,
        settings
	};
};