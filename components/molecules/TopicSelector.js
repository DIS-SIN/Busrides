import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {getAllTags, getPosts} from '../../Ghost-API/contentAPI'
import styles from '../stylesheets/TopicSelector.module.css';

export default function TopicSelector(props) {

    const defaultTopic = {
        value: "all",
        label: props.t["All Topics"]
    }

    const [topics, setTopics] = useState(defaultTopic);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTopics();
    },[]);

    async function getTopics() {
        setLoading(true);
        let tags = await getAllTags();

        tags = tags.reduce(function (res, tag) {
            if (tag.visibility === "public" && tag.slug.match(/\w*/)[0] === props.t.getLocale){
                res.push({
                    value: tag.slug,
                    label: tag.name
                })
            }
            return res;
        }, []);  

        tags.unshift(defaultTopic)

        setTopics(tags);
        setLoading(false);
    }

    async function getNewPosts(slug) {
        setLoading(true)
        let newApiOptions = {
            ...props.apiOptions,
            filter: slug === "all" ? `tag:${props.t.getGhostLocaleTag}` : `tag:${slug}+tag:${props.t.getGhostLocaleTag}`,
            page: 1
        }
        let posts = await getPosts(newApiOptions);
        props.setApiOptions(newApiOptions);
        props.setPosts(posts);
        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <Select
                instanceId="topicSelector"
                className={styles.selector}
                defaultValue={defaultTopic}
                onChange={selected => {getNewPosts(selected.value)}}
                options={topics}
                isLoading={loading}
            />
        </div>
    );
}

// TopicSelector.propTypes = {
    
// };