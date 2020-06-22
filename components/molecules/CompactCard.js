import moment from 'moment';
import Link from 'next/link';
import styles from '../stylesheets/CompactCard.module.css';

export default function CompactCard(props) {

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
        <Link href={`/${props.t.getLocale}/[slug]`} as={`/${props.t.getLocale}/${props.post.slug}`}>
            <div className={styles.card}>
                <img className={styles.image} src={props.post.feature_image} alt={props.post.title}/>
                <div className={styles.content}>
                    <div className={styles.topContent}>
                        <Link href={`${props.t.getLocalePath}/tag/[slug]`} as={`${props.t.getLocalePath}/tag/${props.post.primary_tag.slug}`}>
                            <a className={styles.tag}>{props.post.primary_tag.name}</a>
                        </Link>
                        <p className={styles.timeStamps}>{getTimeSincePublished()}<span>•</span>{getReadingTime()}</p>
                    </div>
                    <div className={styles.bottomContent}>
                        <h2 className={styles.title}>{props.post.title}</h2>
                        <p className={styles.description}>{props.post.excerpt.substr(0, 80)}...</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}