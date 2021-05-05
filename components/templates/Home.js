import { useState } from 'react';
import PropTypes from 'prop-types';
import { cp_t, cp_post, cp_apiOptions, cp_settings, cp_postsMeta } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import TopicSelector from '../molecules/TopicSelector';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/Home.module.css';

export default function Home(props) {

    const [posts, setPosts] = useState(props.posts);
    const [postsMeta, setPostsMeta] = useState(props.postsMeta);
    const [apiOptions, setApiOptions] = useState(props.apiOptions);

    console.log(props.settings);

    return (
        <div>
            <MetaTags title={props.t["Busrides"]} description={props.t.getDescription} image={"https://www.busrides-trajetsenbus.ca/thumbnail.jpg"} url={`${props.t.getURL}${props.t.getLocale === "en" ? "" : "fr/"}`}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.settings.cover_image}>
                <div className={styles.promoBar}>
                    <p>
                        {props.t.betaNotice}
                        <a href="mailto:csps.digitalacademy-academiedunumerique.efpc@canada.ca?subject=Busrides Feedback / Rétroaction sur Trajets en bus"> {props.t["Provide feedback"]}</a>
                    </p>
                </div>
                <img className={styles.logo} src={props.t.getLogo} alt={props.t["Busrides Logo"]}/>
                <p className={styles.description}>{props.t.getDescription}</p>
            </Hero>
            <TopicSelector t={props.t} apiOptions={apiOptions} setPostsMeta={setPostsMeta} setApiOptions={setApiOptions} setPosts={setPosts}/>
            <EpisodeList t={props.t} posts={posts} postsMeta={postsMeta} apiOptions={apiOptions}/>
            <Footer t={props.t}/>
        </div>
    );
}

Home.propTypes = {
    t: cp_t.isRequired,
    posts: PropTypes.arrayOf(cp_post).isRequired,
    apiOptions: cp_apiOptions.isRequired,
    settings: cp_settings.isRequired,
    postsMeta: cp_postsMeta,
};