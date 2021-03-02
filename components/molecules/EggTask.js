import React from 'react';
import PropTypes from 'prop-types';
import styles from '../stylesheets/EggTask.module.css';

export default function EggTask(props) {

    console.log(props.found); 

    return (
        <div className={styles.task}>
            <div className={styles.eggContainer}>
                {props.found ?
                    <img className={styles.egg} src={"/images/egg-hunt/busridesEgg.png"} alt={"Busrides egg"}/>
                :
                    <span className={styles.questionMark}>?</span>
                }
            </div>
            <p>{props.hint}</p>
            {props.found &&
                <span className={styles.checkMark}>&#10004;</span>
            }
        </div>
    );
}

EggTask.propTypes = {
    found: PropTypes.bool,
    hint: PropTypes.string.isRequired
};