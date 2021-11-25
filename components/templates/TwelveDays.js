import React, {useState} from 'react';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import NoPeeking from '../12-days/NoPeeking';
import Flap from '../12-days/Flap';
import Content from '../12-days/Content';
import styles from '../stylesheets/TwelveDays.module.css';

export default function TwelveDays(props) {

    const [dayToOpen, setDayToOpen] = useState(null);
    const [contentIsOpen, openContent] = useState(false);
    const [error, setError] = useState({
        exists: false
    });

    const days = Array.from({length: 12}, (v, k) => k+1);

    return (
        <React.Fragment>
            <MetaTags title={props.data.meta.title} description={props.data.meta.description} image={props.data.meta.image} url={props.data.meta.url}/>
            <Header t={props.t} settings={props.settings}/>
            <div className={styles.header}>
                <h1>{props.data.title}</h1>
                <p>{props.data.description}</p>
            </div>
            <div className={styles.twelveDays} style={{background: `url(${props.data.image})`, backgroundSize: "cover"}}>
                {error.exists ? <NoPeeking error={error} setError={setError}/> : null}
                <div className={styles.calendar}>
                    {days.map(day =>
                        <Flap t={props.t} data={props.data} key={day} day={day} openContent={openContent} setError={setError} setDayToOpen={setDayToOpen}/>
                    )}
                    <Content t={props.t} data={props.data} contentIsOpen={contentIsOpen} openContent={openContent} day={dayToOpen}/>
                </div>
            </div>
            <Footer t={props.t}/>
        </React.Fragment>
    );
}
