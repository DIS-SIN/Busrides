import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'svg-loaders-react'
import { cp_t, cp_post, cp_apiOptions, cp_postsMeta } from '../../helpers/commonProps';
import { getPosts } from '../../Ghost-API/contentAPI';
import { getSearchResults } from '../../Ghost-API/searchAPI';
import Card from '../molecules/Card';
import CompactCard from '../molecules/CompactCard';
import styles from '../stylesheets/EpisodeList.module.css';

export default function EpisodeList(props) {

    const [episodes, setEpisodes] = useState(props.posts);
    const [pageNumber, setPagination] = useState(1);
    const [shouldLoadMore, setshouldLoadMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadMoreButton = useRef(null);

    useEffect(() => {
        setEpisodes(props.posts);
        setPagination(1);
        setshouldLoadMore(true);
    },[props.posts])

    async function loadMore() {
        setshouldLoadMore(false);
        setLoading(true);
        props.apiOptions.page = pageNumber + 1;
        let newEpisodes = await getPosts(props.apiOptions);
        setPagination(pageNumber + 1);
        // If this is the last page
        if (newEpisodes.meta.pagination.next){
            setshouldLoadMore(true);
        }
        setEpisodes(episodes.concat(newEpisodes));
        setLoading(false);
    }

    async function loadMoreSearchResults() {
        let newResults = await getSearchResults(props.searchMeta.searchTerm, props.t.getGhostLocaleTag, episodes.length, props.searchMeta.sortBy);
        if (episodes.length + newResults.posts.length >= newResults.total){
            setshouldLoadMore(false);
        }
        setEpisodes(episodes.concat(newResults.posts));
    }

    return (
        <div className={styles.container}>
            <div className={styles.episodeList} aria-live="polite">
                 {episodes.map(post => (
                     props.useCompactView ? 
                     <CompactCard key={post.id} t={props.t} post={post} mobile={props.mobile}/>
                     :
                     <Card key={post.id} t={props.t} post={post}/>
                 ))}
             </div>
             {loading &&
                <ThreeDots fill="#ce3f3f" className={styles.loader}/>
             }
             {/* Only show the button if apiOptions are passed and if meta details are passed and there are more episodes to load */}
             {shouldLoadMore && (props.searchMeta && props.searchMeta.total > 10 && props.searchMeta.total != props.posts.length || props.apiOptions && (props.postsMeta ? props.postsMeta.pagination.total > props.posts.length : true)) ?
                 <button className={styles.loadMoreButton} ref={loadMoreButton} onClick={props.apiOptions ? loadMore : loadMoreSearchResults} aria-label={props.t["Load More"]}>
                     {props.t["Load More"]}
                 </button>
             : undefined}
        </div>
    );
}

EpisodeList.propTypes = {
    t: cp_t.isRequired,
    posts: PropTypes.arrayOf(cp_post).isRequired,
    searchMeta: PropTypes.shape({
       searchTerm: PropTypes.string.isRequired,
       sortBy: PropTypes.string.isRequired,
       total: PropTypes.number.isRequired 
    }),
    postsMeta: cp_postsMeta,
    apiOptions: cp_apiOptions,
    useCompactView: PropTypes.bool,
    mobile: PropTypes.bool
};
