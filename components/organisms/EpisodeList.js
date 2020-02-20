import { useState, useRef } from 'react';
import { getPosts } from '../../Ghost-API/contentAPI';
import Card from '../molecules/Card';
import styles from '../stylesheets/EpisodeList.module.css';

export default function EpisodeList(props) {

    const [episodes, setEpisodes] = useState(props.posts);
    const [pageNumber, setPagination] = useState(1);

    const loadMoreButton = useRef(null);


    async function loadMore() {
        let newEpisodes = await getPosts(props.t.getGhostLocaleTag, pageNumber + 1);
        setPagination(pageNumber + 1);
        // If this is the last page
        if (!newEpisodes.meta.pagination.next){
            loadMoreButton.current.remove();
        }
        setEpisodes(episodes.concat(newEpisodes));
    }

    return (
        <div className={styles.container}>
            <div className={styles.episodeList}>
                {episodes.map(post => (
                    <Card key={post.id} t={props.t} post={post}/>
                ))}
            </div>
            <a className={styles.loadMoreButton} ref={loadMoreButton} onClick={loadMore}>{props.t["Load More"]}</a>
            {/* <h1>Tags:</h1>
            {props.tags.map(tag => (
                <p key={tag.id}>{tag.name}</p>
            ))} */}
        </div>
    );
}