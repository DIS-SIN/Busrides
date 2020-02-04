import { getPosts, getPages } from '../Ghost-API/contentAPI';

export default function Index(props) {

    return (
        <div>
            <h1>Pages</h1>
            {props.pages.map(page => (
                <p key={page.id}>{page.title}</p>
            ))}
            <h1>Episode List:</h1>
            {props.posts.map(post => (
                <p key={post.id}>{post.title}</p>
            ))}
        </div>
    );
}

Index.getInitialProps = async function() {
    const posts = await getPosts();
    const pages = await getPages();

	return {
        posts,
        pages
	};
};