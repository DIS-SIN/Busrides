import Link from 'next/link';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
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
            let secondaryAuthors = props.t["along with"] + " ";
            for (let i = 1; i < props.authors.length; i++) {
                secondaryAuthors += props.authors[i].name + ",";
            }
            // Remove the trailing comma and then uppercase the first letter
            secondaryAuthors = secondaryAuthors.substr(0, secondaryAuthors.length - 1);
            return secondaryAuthors.charAt(0).toUpperCase() + secondaryAuthors.slice(1);
        }
        return null;
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
                {getSecondaryAuthors() ? <p className={styles.secondaryAuthors}>{getSecondaryAuthors()}</p> : undefined}
                <p className={styles.bio}>{primaryAuthor.bio}</p>
                <div className={styles.socialDetails}>
                    { primaryAuthor.website ? 
                        <a href={primaryAuthor.website} target="_blank">
                            <IcomoonReact iconSet={iconSet} size={15} icon="globe"/>
                        </a>
                    : undefined}
                    { primaryAuthor.twitter ? 
                        <a href={getTwitterProfile()} target="_blank">
                            <IcomoonReact iconSet={iconSet} size={15} icon="twitter"/>
                        </a>
                    : undefined}
                    {props.numberOfPosts ?
                        <React.Fragment>
                            <span>•</span>
                            {`${props.numberOfPosts} ${props.t["posts"]}`}
                        </React.Fragment>
                    : undefined}
                    <span>•</span>
                    {primaryAuthor.location}
                </div>
            </div>
        </div>
    );
}