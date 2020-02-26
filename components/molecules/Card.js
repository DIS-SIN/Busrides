import moment from 'moment';
import Tippy from '@tippy.js/react'
import Link from 'next/link';
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
        <Link href={`/${props.t.getLocale}/[slug]`} as={`/${props.t.getLocale}/${props.post.slug}`}>
            <div className={styles.card}>
                <div className={styles.image} style={{backgroundImage: `url(${props.post.feature_image})`}}>
                    <Link href={`${props.t.getLocalePath}/author/[slug]`} as={`${props.t.getLocalePath}/author/${props.post.primary_author.slug}`} passHref>
                        <AuthorTippy t={props.t} post={props.post}/>
                    </Link>
                </div>
                <div className={styles.content}>
                    <Link href={`${props.t.getLocalePath}/tag/[slug]`} as={`${props.t.getLocalePath}/tag/${props.post.primary_tag.slug}`}>
                        <a className={styles.tag}>{props.post.primary_tag.name}</a>
                    </Link>
                    <h2 className={styles.title}>{props.post.title}</h2>
                    <p className={styles.description}>{props.post.excerpt.substr(0, 80)}...</p>
                    <p className={styles.timeStamps}>{getTimeSincePublished()}<span>•</span>{getReadingTime()}</p>
                </div>
            </div>
        </Link>
    );
}

const AuthorTippy = React.forwardRef((props, ref) => {

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

    return (
        <a href={props.href} onClick={props.onClick} ref={ref}>
            <Tippy content={getAuthors()} arrow={false}>
                <div className={styles.author} style={{backgroundImage: `url(${props.post.primary_author.profile_image})`}}/>
            </Tippy>
        </a>
    )
})