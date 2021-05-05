import PropTypes from 'prop-types';
import {CircularProgressbar} from 'react-circular-progressbar';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t, cp_post } from '../../helpers/commonProps';
import styles from '../stylesheets/ShareButtons.module.css';

export default function ShareButtons(props) {

    const PostURL = `${props.t.getURL}${props.t.getLocale === "en" ? "en" : "fr"}/${props.post.slug}`;

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
            return `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(PostURL)}&t=${encodeURI(props.post.title)}`;
        }
        if (method == "twitter"){
            return `https://twitter.com/share?url=${encodeURI(PostURL)}&text=${encodeURI(props.post.title)}`;
        }
        if (method == "linkedin"){
            return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURI(PostURL)}&title=${encodeURI(props.post.title)}`;
        }
    }

    return (
        <div className={styles.shareButtons}>
            <div className={styles.sticky}>
                <div onClick={scrollToTop} className={styles.button}>
                    <IcomoonReact iconSet={iconSet} size={15} icon="arrow-top"/>
                    <CircularProgressbar className={styles.progress} value={props.scrollPercentage * 100}/>
                </div>
                <a className={styles.button} href={getShareLink("twitter")} aria-label={`${props.t["Share to"]} Twitter`} target="_blank" rel="noopener">
                    <IcomoonReact iconSet={iconSet} size={15} icon="twitter"/>
                </a>
                <a className={styles.button} href={getShareLink("facebook")} aria-label={`${props.t["Share to"]} Facebook`} target="_blank" rel="noopener">
                    <IcomoonReact iconSet={iconSet} size={15} icon="facebook"/>
                </a>
                <a className={styles.button} href={getShareLink("linkedin")} aria-label={`${props.t["Share to"]} LinkedIn`} target="_blank" rel="noopener">
                    <IcomoonReact iconSet={iconSet} size={15} icon="linkedin"/>
                </a>
            </div>
        </div>
    );
}

ShareButtons.propTypes = {
    t: cp_t.isRequired,
    post: cp_post.isRequired,
    scrollPercentage: PropTypes.number.isRequired
};