import Home from '../../components/templates/Home';
import { getPosts, getPages, getTags, getSettings } from '../../Ghost-API/contentAPI';
import dictionary from '../../locales/fr';

export default function Index(props) {
    return (
        <Home t={dictionary} posts={props.posts} pages={props.pages} tags={props.tags} settings={props.settings}/>
    );
}

Index.getInitialProps = async function() {
    const posts = await getPosts();
    const pages = await getPages();
    const tags = await getTags();
    const settings = await getSettings();

	return {
        posts,
        pages,
        tags,
        settings
	};
};