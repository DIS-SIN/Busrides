import { getPosts } from '../Ghost-API/posts';

export default function Index(props) {

    return (
        <div>
            <h1>Episode List:</h1>
            {props.posts.map(post => (
                <p key={post.id}>{post.title}</p>
            ))}
        </div>
    );
}

Index.getInitialProps = async function() {
	const posts = await getPosts();

	return {
        posts: posts
	};
};