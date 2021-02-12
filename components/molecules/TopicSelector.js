import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {getAllTags, getPosts} from '../../Ghost-API/contentAPI'
import { cp_t, cp_apiOptions } from '../../helpers/commonProps';
import styles from '../stylesheets/TopicSelector.module.css';

export default function TopicSelector(props) {

    const defaultTopic = {
        value: "all",
        label: props.t["All Topics"]
    }

    const hiddenTopics = ["en-discover-series", "fr-discover-series"];

    const [topics, setTopics] = useState(defaultTopic);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTopics();
    },[]);

    async function getTopics() {
        setLoading(true);
        let tags = await getAllTags();

        tags = tags.reduce(function (res, tag) {
            if (tag.visibility === "public" && tag.slug.match(/\w*/)[0] === props.t.getLocale && !hiddenTopics.includes(tag.slug)){
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
            filter: slug === "all" ? `tag:${props.t.getGhostLocaleTag}+tag:-hash-learning-path` : `tag:${slug}+tag:${props.t.getGhostLocaleTag}+tag:-hash-learning-path`,
            page: 1
        }
        let posts = await getPosts(newApiOptions);
        props.setApiOptions(newApiOptions);
        props.setPostsMeta(posts.meta);
        props.setPosts(posts);
        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <Select
                instanceId="topicSelector"
                className={styles.selector}
                classNamePrefix="react-select"
                defaultValue={defaultTopic}
                onChange={selected => {getNewPosts(selected.value)}}
                options={topics}
                isLoading={loading}
            />
        </div>
    );
}

TopicSelector.propTypes = {
    t: cp_t.isRequired,
    apiOptions: cp_apiOptions.isRequired,
    setPostsMeta: PropTypes.func.isRequired,
    setApiOptions: PropTypes.func.isRequired,
    setPosts: PropTypes.func.isRequired
};