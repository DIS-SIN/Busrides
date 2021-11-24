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
        <div className={styles.flap} data-day={props.day} onClick={open} tabIndex="1">
            <p>{props.day}</p>
            <IcomoonReact className={styles.lock} iconSet={iconSet} size={30} icon={checkDate() ? "lock-open" : "lock-locked"}/>
        </div>
    );
}

export default Flap;
