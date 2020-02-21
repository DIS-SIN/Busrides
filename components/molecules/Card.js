import moment from 'moment';
import Tippy from '@tippy.js/react'
import Link from 'next/link';
import styles from '../stylesheets/Card.module.css';

export default function Card(props) {

    function getAuthors() {
        if (props.post.authors.length > 1){
            let authors = `${props.post.authors[0].name} ${props.t["along with"]} `;
            for (let i = 1; i < props.post.authors.length; i++) {
                authors += props.post.authors[i].name + ",";
            }
            return authors.substr(0, authors.length - 1);
        }
        return props.post.primary_author.name;
    }

    function getTimeSincePublished() {
        moment.locale(props.t.getLocale);
        return moment(props.post.published_at).fromNow();
    }

    function getReadingTime() {
        const wordsPerMinute = 275; // Average case.
        let textLength = props.post.html.split(" ").length; // Split by words
        let readingTime = textLength > 0 ? Math.ceil(textLength / wordsPerMinute) : 0;

        if (props.t.getLocale === "fr"){
            return `${props.t["read"]} ${readingTime} min`;
        }
        return `${readingTime} min ${props.t["read"]}`;
    }

    return (
        <div className={styles.card}>
            <div className={styles.image} style={{backgroundImage: `url(${props.post.feature_image})`}}>
                <Tippy content={getAuthors()} arrow={false}>
                    <div className={styles.author} style={{backgroundImage: `url(${props.post.primary_author.profile_image})`}}/>
                </Tippy>
            </div>
            <div className={styles.content}>
                <a className={styles.tag}>{props.post.primary_tag.name}</a>
                <Link href={`/${props.t.getLocale}/[slug]`} as={`/${props.t.getLocale}/${props.post.slug}`}>
                    <h2 className={styles.title}>{props.post.title}</h2>
                </Link>
                <p className={styles.description}>{props.post.excerpt.substr(0, 80)}...</p>
                <p className={styles.timeStamps}>{getTimeSincePublished()}<span>•</span>{getReadingTime()}</p>
            </div>
        </div>
    );
}