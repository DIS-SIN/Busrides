import { useState, useRef } from 'react';
import { getPosts } from '../../Ghost-API/contentAPI';
import Card from '../molecules/Card';
import styles from '../stylesheets/EpisodeList.module.css';

export default function EpisodeList(props) {

    const [episodes, setEpisodes] = useState(props.posts);
    const [pageNumber, setPagination] = useState(1);

    const loadMoreButton = useRef(null);


    async function loadMore() {
        props.apiOptions.page = pageNumber + 1;
        let newEpisodes = await getPosts(props.apiOptions);
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
            {/* Only show the button if apiOptions are passed and if meta details are passed and there are more episodes to load */}
            {props.apiOptions && (props.postsMeta ? props.postsMeta.pagination.total > props.posts.length : true) ?
                <a className={styles.loadMoreButton} ref={loadMoreButton} onClick={loadMore}>{props.t["Load More"]}</a>
            : undefined}
        </div>
    );
}