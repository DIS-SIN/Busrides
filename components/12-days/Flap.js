import React from 'react';
import styles from './Flap.module.scss';

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
        <button className={ styles.flap } data-day={ props.day } onClick={ open } >
            <span className={"wb-inv"}> { props.t.day } </span>
            <span className={ styles.day }>{ props.day }</span>
            <span className={ checkDate() ? styles.lockopen : styles.lockclosed}>
                <span className={"wb-inv"}>{ checkDate() ? props.t.unlocked : props.t.locked }</span>
            </span>
        </button>
    );
}

export default Flap;
