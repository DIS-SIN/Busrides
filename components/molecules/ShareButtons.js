import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import styles from '../stylesheets/ShareButtons.module.css';

export default function ShareButtons(props) {

    // Scroll function found here: https://stackoverflow.com/a/48942924/5879734
    function scrollToTop() {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    }

    function getShareLink(method) {
        if (method == "facebook"){
            return `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(props.post.url)}&t=${encodeURI(props.post.title)}`;
        }
        if (method == "twitter"){
            return `https://twitter.com/share?url=${encodeURI(props.post.url)}&text=${encodeURI(props.post.title)}`;
        }
        if (method == "linkedin"){
            return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURI(props.post.url)}&title=${encodeURI(props.post.title)}`;
        }
    }

    return (
        <div className={styles.shareButtons}>
            <div className={styles.sticky}>
                <div className={styles.button} onClick={scrollToTop}>
                    <IcomoonReact iconSet={iconSet} size={15} icon="arrow-top"/>
                </div>
                <a className={styles.button} href={getShareLink("twitter")} target="_blank">
                    <IcomoonReact iconSet={iconSet} size={15} icon="twitter"/>
                </a>
                <a className={styles.button} href={getShareLink("facebook")} target="_blank">
                    <IcomoonReact iconSet={iconSet} size={15} icon="facebook"/>
                </a>
                <a className={styles.button} href={getShareLink("linkedin")} target="_blank">
                    <IcomoonReact iconSet={iconSet} size={15} icon="linkedin"/>
                </a>
            </div>
        </div>
    );
}