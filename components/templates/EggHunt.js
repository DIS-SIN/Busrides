import React, { useState } from 'react';
import { cp_t, cp_settings } from '../../helpers/commonProps';
import {getEggsFound} from '../../helpers/helpers';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import EggTask from '../molecules/EggTask';
import Footer from '../organisms/Footer';
import eggList from '../egg-hunt/egg-list.json';
import styles from '../stylesheets/EggHunt.module.css';

export default function EggHunt(props) {

    const [eggsFound, setEggsFound] = useState(getEggsFound);

    console.log(eggsFound);

    return (
        <div>
            <MetaTags title={props.t.eggHuntTitle} description={props.t.eggHuntDescription} url={`https://busrides-trajetsenbus.ca${props.t.getLocalePath}/egg-hunt`} image={"/images/thumbnails/eggHunt.png"}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={"https://images.unsplash.com/photo-1584963237901-8ff959b9b4b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80"}>
                <div className={styles.heroContent}>
                    <div>
                        <h1>{props.t.eggHuntTitle}</h1>
                        <p>{props.t.eggHuntDescription}</p>
                    </div>
                    <img src="/images/egg-hunt/busridesEgg.png" alt={props.t.eggHuntAlt}/>
                </div>
            </Hero>
            <div className={styles.taskList}>
                {eggList.map(egg =>
                    <EggTask key={egg.id} hint={egg.hint[props.t.getLocale]} found={eggsFound.includes(egg.id)}/>
                )}
            </div>
            <Footer t={props.t}/>
        </div>
    );
}

EggHunt.propTypes = {
    t: cp_t.isRequired,
    settings: cp_settings.isRequired,
};