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

    return (
        <div>
            <MetaTags t={props.t} title={props.t["Busrides"]} description={props.t.getDescription} image={`${props.t.getURL}thumbnail.jpg`} url={`${props.t.getURL}${props.t.getLocale === "en" ? "" : "fr/"}`}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.settings.cover_image}>
                <img className={styles.logo} src={props.t.getLogo} alt={props.t["Busrides Logo"]}/>
                <p className={styles.description}>{props.t.getDescription}</p>
            </Hero>
            <TopicSelector t={props.t} apiOptions={apiOptions} setPostsMeta={setPostsMeta} setApiOptions={setApiOptions} setPosts={setPosts}/>
            <EpisodeList t={props.t} posts={posts} postsMeta={postsMeta} apiOptions={apiOptions}/>
            <Footer t={props.t}>
                <div className={styles.promoBar}>
                    <p>
                        {props.t.betaNotice}
                        <a href="mailto:csps.digitalacademy-academienumerique.efpc@csps-efpc.gc.ca?subject=Busrides%20Feedback%20%2F%20R%C3%A9troaction%20sur%20Trajets%20en%20bus"> {props.t["Provide feedback"]}</a>
                    </p>
                </div>
            </Footer>
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
