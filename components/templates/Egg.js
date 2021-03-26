import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getEggsFound } from '../../helpers/helpers';
import styles from '../stylesheets/Egg.module.css';

export default function Egg(props) {

    const [hideEgg, setHideEgg] = useState(false);
    const [eggsFound, setEggsFound] = useState(getEggsFound);

    function findEgg() {
        console.log(props.id);
        setHideEgg(true);
        if (localStorage){
            if (localStorage.eggHunt){
                let found = JSON.parse(localStorage.eggHunt);
                found.push(props.id);
                localStorage.eggHunt = JSON.stringify(found);
            }
            else {
                localStorage.eggHunt = JSON.stringify([props.id]);
            }
        }
    }

    if (!eggsFound.includes(props.id)){
        return (
            <img
                className={classnames(styles.egg, {[styles.animateOut]:hideEgg})}
                style={{
                    height: "100vh",
                    transform: `rotate(${12}deg)`
                }}
                src={"/images/egg-hunt/busridesEgg.png"}
                alt={"Busrides egg - Oeuf de Busrides"}
                onClick={findEgg}
            />  
        );
    }
    return (null);
}

Egg.propTypes = {
    id: PropTypes.string.isRequired
};