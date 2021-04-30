import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cp_t, cp_post } from '../../helpers/commonProps';
import styles from '../stylesheets/TagsList.module.css';

export default function TagsList(props) {

    const [tags, setTags] = useState(getTagsArray());

    function getTagsArray() {
        let tagArray = [];

        // Consolidate an array with all the tags from the posts
        props.posts.forEach(post => {
            tagArray.push(...post.tags);
        });

        // Remove the hidden tags used for setting the language
        tagArray = tagArray.filter(tag => {
            if (tag.visibility != "internal" && tag.slug !== "english" && tag.slug !== "francais"){
                return true;
            }
        });

        let filteredTagArray = [];

        // Remove duplicate tags from the array
        tagArray.forEach(tag => {
            if (!filteredTagArray.find(filteredTag => filteredTag.id === tag.id)){
                filteredTagArray.push(tag);
            }
        });
    
        return filteredTagArray;
    }

    return (
        <div className={styles.container}>
            {!props.hideTitle &&
                <h2 className={styles.title}>{props.t["Topics"]}</h2>
            }
            <div className={styles.tagList}>
                {tags.map(tag => (
                    <Link key={tag.id} href={`${props.t.getLocalePath}/tag/[slug]`} as={`${props.t.getLocalePath}/tag/${tag.slug}`}>
                        <div className={styles.tag}>{tag.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

TagsList.propTypes = {
    t: cp_t.isRequired,
    posts: PropTypes.arrayOf(cp_post).isRequired
};