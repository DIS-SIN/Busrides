import React, {useState} from 'react';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import PostContent from '../organisms/PostContent';
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
            <MetaTags title={"Twelve Days"} description={"Description"} image={"https://raw.githubusercontent.com/DIS-SIN/12-Days-of-Data/master/src/images/bg.jpg"} url={'http://localhost:3000/en/12-days'}/>
            <Header t={props.t} settings={props.settings}/>
            {/* <Hero backgroundImage={"https://www.ghd.com/en/about-us/resources/News-insights/Insights/digital/snowy-mountains.jpg"}>
                <h1>{"Twelve Days"}</h1>
            </Hero> */}
            <div className={styles.header}>
                <h1>Welcome to Busrides’ 12 days of data!</h1>
                <p>The 12 most interesting data facts and resources sit behind the calendar doors. A new door will be available to open every day until December 20th.</p>
            </div>
            <div className={styles.twelveDays} style={{background: `url("https://raw.githubusercontent.com/DIS-SIN/12-Days-of-Data/master/src/images/bg.jpg")`}}>
                {error.exists ? <NoPeeking error={error} setError={setError}/> : null}
                <div className={styles.calendar}>
                    {days.map(day => <Flap data={props.data} key={day} day={day} openContent={openContent} setError={setError} setDayToOpen={setDayToOpen}/>)}
                    <Content data={props.data} contentIsOpen={contentIsOpen} openContent={openContent} day={dayToOpen}/>
                </div>
            </div>
            <Footer t={props.t}/>
        </React.Fragment>
    );
}