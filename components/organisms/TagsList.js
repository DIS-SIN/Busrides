import { useState } from 'react';
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
            if (tag.slug !== "hash-english" && tag.slug !== "hash-francais" && tag.slug !== "english" && tag.slug !== "francais"){
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
            <h2 className={styles.title}>{props.t["Topics"]}</h2>
            <div className={styles.tagList}>
                {tags.map(tag => (
                    <div className={styles.tag} key={tag.id}>{tag.name}</div>
                ))}
            </div>
        </div>
    );
}