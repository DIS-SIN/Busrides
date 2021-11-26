import React from 'react';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import styles from './Flap.module.css';

function Flap(props) {

    const dayContent = props.data.content[`day_${props.day}`];

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
        return Date.now() >= new Date(dayContent.unlocks_at);
    }

    return (
        
        <button className={styles.flap} data-day={ props.day } onClick={open} >
            <span class={ styles.hiddenday }>Day </span>
            <span class={ styles.day }>{props.day}</span>
            <span class={ checkDate() ? styles.lockopen : styles.lockclosed }>{ checkDate() ? "Unlocked" : "Locked" }</span>
        </button>
    );
}

export default Flap;
