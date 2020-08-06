import { useState, useRef, useEffect } from 'react';
import { getPosts } from '../../Ghost-API/contentAPI';
import { getSearchResults } from '../../Ghost-API/searchAPI';
import Card from '../molecules/Card';
import CompactCard from '../molecules/CompactCard';
import styles from '../stylesheets/EpisodeList.module.css';

export default function EpisodeList(props) {

    const [episodes, setEpisodes] = useState(props.posts);
    const [pageNumber, setPagination] = useState(1);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

    const loadMoreButton = useRef(null);

    useEffect(() => {
        setEpisodes(props.posts);
        setShowLoadMoreButton(true);
    },[props.posts])

    async function loadMore() {
        props.apiOptions.page = pageNumber + 1;
        let newEpisodes = await getPosts(props.apiOptions);
        setPagination(pageNumber + 1);
        // If this is the last page
        if (!newEpisodes.meta.pagination.next){
            setShowLoadMoreButton(false);
        }
        setEpisodes(episodes.concat(newEpisodes));
    }

    async function loadMoreSearchResults() {
        let newResults = await getSearchResults(props.searchMeta.searchTerm, props.t.getGhostLocaleTag, episodes.length, props.searchMeta.sortBy);
        if (episodes.length + newResults.posts.length >= newResults.total){
            setShowLoadMoreButton(false);
        }
        setEpisodes(episodes.concat(newResults.posts));
    }

    return (
        <div className={styles.container}>
            <div className={styles.episodeList}>
                {episodes.map(post => (
                    props.useCompactView ? 
                    <CompactCard key={post.id} t={props.t} post={post} mobile={props.mobile}/>
                    :
                    <Card key={post.id} t={props.t} post={post}/>
                ))}
            </div>
            {/* Only show the button if apiOptions are passed and if meta details are passed and there are more episodes to load */}
            {showLoadMoreButton && (props.searchMeta && props.searchMeta.total > 10 || props.apiOptions && (props.postsMeta ? props.postsMeta.pagination.total > props.posts.length : true)) ?
                <a className={styles.loadMoreButton} ref={loadMoreButton} onClick={props.apiOptions ? loadMore : loadMoreSearchResults}>{props.t["Load More"]}</a>
            : undefined}
        </div>
    );
}