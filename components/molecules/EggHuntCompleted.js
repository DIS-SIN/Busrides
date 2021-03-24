import React from 'react';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t } from '../../helpers/commonProps';
import styles from '../stylesheets/EggHuntCompleted.module.css';

export default function EggHuntCompleted(props) {

    const URL = `https://busrides-trajetsenbus.ca/${props.t.getLocale}/egg-hunt?complete`;

    function createShareButton(platform) {
        return (
            <a key={platform} className={styles.socialButton} href={getShareLink(platform.toLowerCase())} aria-label={`${props.t["Share to"]} ${platform}`} target="_blank" rel="noopener">
                <IcomoonReact iconSet={iconSet} size={15} icon={platform.toLowerCase()}/>
            </a>
        )
    }

    function getShareLink(method) {
        if (method == "facebook"){
            return `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(URL)}&t=${encodeURI(props.t.completedTweet)}`;
        }
        if (method == "twitter"){
            return `https://twitter.com/share?url=${encodeURI(URL)}&text=${encodeURI(props.t.completedTweet)}`;
        }
        if (method == "linkedin"){
            return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURI(URL)}&title=${encodeURI(props.t.completedTweet)}`;
        }
    }

    return (
        <div className={styles.completed}>
            <img src={props.t.getLocale === "en" ? "/images/egg-hunt/congrats.gif" : "/images/egg-hunt/congratsFR.gif"} alt={props.t.completedAlt}/>
            <p>{props.t["Share to"]}</p>
            <div>
                {["Twitter", "Facebook", "LinkedIn"].map(platform => createShareButton(platform))}
            </div>
        </div>
    );
}

EggHuntCompleted.propTypes = {
    t: cp_t.isRequired
};