import Header from '../components/Header';
import { getPosts, getPages, getTags, getSettings } from '../Ghost-API/contentAPI';

export default function Index(props) {

    console.log(props.settings)

    return (
        <div>
            <Header settings={props.settings}/>
            <h1>Pages:</h1>
            {props.pages.map(page => (
                <p key={page.id}>{page.title}</p>
            ))}
            <h1>Episodes:</h1>
            {props.posts.map(post => (
                <p key={post.id}>{post.title}</p>
            ))}
            <h1>Tags:</h1>
            {props.tags.map(tag => (
                <p key={tag.id}>{tag.name}</p>
            ))}
        </div>
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