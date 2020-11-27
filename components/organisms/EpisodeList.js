import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
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

    useEffect(() => {
        setEpisodes(props.posts);
        setshouldLoadMore(true);
    },[props.posts])

    async function loadMore() {
        props.apiOptions.page = pageNumber + 1;
        let newEpisodes = await getPosts(props.apiOptions);
        setPagination(pageNumber + 1);
        // If this is the last page
        if (!newEpisodes.meta.pagination.next){
            setshouldLoadMore(false);
        }
        setEpisodes(episodes.concat(newEpisodes));
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
            <InfiniteScroll
                dataLength={episodes.length} //This is important field to render the next data
                next={props.apiOptions ? loadMore : loadMoreSearchResults}
                hasMore={shouldLoadMore && (props.searchMeta && props.searchMeta.total > 10 && props.searchMeta.total != props.posts.length || props.apiOptions && (props.postsMeta ? props.postsMeta.pagination.total > props.posts.length : true))}
                loader={<ThreeDots fill="#ce3f3f" className={styles.loader}/>}
            >
                <div className={styles.episodeList}>
                    {episodes.map(post => (
                        props.useCompactView ? 
                        <CompactCard key={post.id} t={props.t} post={post} mobile={props.mobile}/>
                        :
                        <Card key={post.id} t={props.t} post={post}/>
                    ))}
                </div>
            </InfiniteScroll>
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