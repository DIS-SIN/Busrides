import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t, cp_author } from '../../helpers/commonProps';
import styles from '../stylesheets/AuthorDetails.module.css';

export default function AuthorDetails(props) {

    const primaryAuthor = props.authors[0];

    function getMainClass() {
        if (props.episodePage){
            return styles.episodePage;
        }
        if (props.authorPage){
            return styles.authorPage;
        }
        return undefined;
    }

    function getSecondaryAuthors() {
        if (props.authors.length > 1){
            let secondaryAuthors = (
                <p className={styles.secondaryAuthors}>
                    {/* Capitalize the first letter of "along with" */}
                    {props.t["along with"].charAt(0).toUpperCase() + props.t["along with"].slice(1) + " "}
                    {props.authors.slice(1, props.authors.length).map(author => (
                        <Link href={`${props.t.getLocalePath}/author/[slug]`} as={`${props.t.getLocalePath}/author/${author.slug}`}>
                            {/* Remove the trailing comma if this is the last author in the list */}
                            {author.name + (props.authors[props.authors.length - 1] != author ? "," : "")}
                        </Link>
                    ))}
                </p>
            );
            return secondaryAuthors;
        }
        return undefined;
    }

    function getTwitterProfile() {
        if (!primaryAuthor.twitter){
            return null;
        }
        let baseURL = "https://twitter.com/";
        if (primaryAuthor.twitter[0] === "@"){
            return baseURL + primaryAuthor.twitter.substr(1, primaryAuthor.twitter.length);
        }
        return baseURL + primaryAuthor.twitter;
    }

    return (
        <div className={getMainClass()}>
            <Link href={`${props.t.getLocalePath}/author/[slug]`} as={`${props.t.getLocalePath}/author/${primaryAuthor.slug}`}>
                <img className={styles.avatar} src={primaryAuthor.profile_image} alt={primaryAuthor.name}/>
            </Link>
            <div className={styles.contentArea}>
                <Link href={`${props.t.getLocalePath}/author/[slug]`} as={`${props.t.getLocalePath}/author/${primaryAuthor.slug}`}>
                    <h2 className={styles.name}>{primaryAuthor.name}</h2>
                </Link>
                {getSecondaryAuthors()}
                <p className={styles.bio}>{primaryAuthor.bio}</p>
                <div className={styles.socialDetails}>
                    { primaryAuthor.website ? 
                        <a href={primaryAuthor.website} aria-label={props.t["Visit website"]} target="_blank" rel="noopener">
                            <IcomoonReact iconSet={iconSet} size={15} icon="globe"/>
                        </a>
                    : undefined}
                    { primaryAuthor.twitter ? 
                        <a href={getTwitterProfile()} aria-label={`${primaryAuthor.name} Twitter`} target="_blank" rel="noopener">
                            <IcomoonReact iconSet={iconSet} size={15} icon="twitter"/>
                        </a>
                    : undefined}
                    {props.numberOfPosts &&
                        <React.Fragment>
                            <span>•</span>
                            {`${props.numberOfPosts} ${props.t["posts"]}`}
                        </React.Fragment>
                    }
                    {primaryAuthor.location &&
                        <React.Fragment>
                            <span>•</span>
                            {primaryAuthor.location}
                        </React.Fragment>
                    }
                </div>
            </div>
        </div>
    );
}

AuthorDetails.propTypes = {
    t: cp_t.isRequired,
    authorPage: PropTypes.bool,
    authors: PropTypes.arrayOf(cp_author).isRequired,
    numberOfPosts: PropTypes.number
};