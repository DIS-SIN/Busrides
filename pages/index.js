import Home from '../components/templates/Home';
import { getPosts, getTags, getSettings } from '../Ghost-API/contentAPI';
import dictionary from '../locales/en';

export default function Index(props) {
    return (
        <Home t={dictionary} posts={props.posts} pages={props.pages} tags={props.tags} settings={props.settings}/>
    );
}

Index.getInitialProps = async function() {
    const posts = await getPosts(dictionary.getGhostLocaleTag);
    const tags = await getTags();
    const settings = await getSettings();

	return {
        posts,
        tags,
        settings
	};
};