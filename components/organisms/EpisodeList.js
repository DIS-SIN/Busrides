import Card from '../molecules/Card';
import styles from '../stylesheets/EpisodeList.module.css';

export default function EpisodeList(props) {
    return (
        <div>
            <div className={styles.episodeList}>
                {props.posts.map(post => (
                    // <p key={post.id}>{post.title}</p>
                    <Card key={post.id} t={props.t} post={post}/>
                ))}
            </div>
            <h1>Tags:</h1>
            {props.tags.map(tag => (
                <p key={tag.id}>{tag.name}</p>
            ))}
        </div>
    );
}