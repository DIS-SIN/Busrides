import moment from 'moment';
import styles from '../stylesheets/Card.module.css';

export default function Card(props) {

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
            <div className={styles.image} style={{backgroundImage: `url(${props.post.feature_image})`}}></div>
            <div className={styles.content}>
                <a className={styles.tag}>{props.post.primary_tag.name}</a>
                <h2 className={styles.title}>{props.post.title}</h2>
                <p className={styles.description}>{props.post.excerpt.substr(0, 80)}...</p>
                <p className={styles.timeStamps}>{getTimeSincePublished()}<span>•</span>{getReadingTime()}</p>
            </div>
        </div>
    );
}