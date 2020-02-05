export default function EpisodeList(props) {
    return (
        <div>
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