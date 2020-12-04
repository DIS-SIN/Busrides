import React from 'react';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import Data_EN from './Data';
import Data_FR from './Data-fr';
import styles from './Flap.module.css';

function Flap(props) {

    // let url = window.location !== window.parent.location ? document.referrer : document.location.href;
    // let Data = url.includes("/fr/") ? Data_FR : Data_EN;
    let Data = Data_EN;

    const dayContent = Data[`day_${props.day}`];

    function open(ev) {
        if (checkDate()){
            console.log("Opening Day ", ev.target.getAttribute("data-day"));
            props.setDayToOpen(props.day);
            props.openContent(true);
        }
        else {
            props.setError({
                exists: true,
                message: dayContent.error_message
            });
        }
    }

    function checkDate() {
        // return new Date("December 5, 2019") >= new Date(dayContent.unlocks_at);
        return Date.now() >= new Date(dayContent.unlocks_at);
    }

    return (
        <div className={styles.flap} data-day={props.day} onClick={open} tabIndex="1">
            <p>{props.day}</p>
            <IcomoonReact className={styles.lock} iconSet={iconSet} size={30} icon={checkDate() ? "lock-open" : "lock-closed"}/>
        </div>
    );
}

export default Flap;
