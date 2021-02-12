import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { cp_t, cp_post, cp_apiOptions, cp_settings, cp_postsMeta } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/LandingPage.module.css';

export default function LandingPage(props) {

    const [posts, setPosts] = useState(props.posts);
    const [postsMeta, setPostsMeta] = useState(props.postsMeta);
    const [apiOptions, setApiOptions] = useState(props.apiOptions);

    console.log(props.settings);

    return (
        <div>
            <MetaTags title={props.t["Learning Paths"]} description={props.t.learningPathsSlogan} image="/images/learning-paths/landingPageBg.jpeg" url={`https://busrides-trajetsenbus.ca/${props.t.getLocale}/learning-paths`}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage="/images/learning-paths/landingPageBg.jpeg">
                <h1>{props.t["Learning Paths"]}</h1>
                <p className={styles.description}>{props.t.learningPathsSlogan}</p>
            </Hero>
            <div className={styles.contentContainer}>
                <ReactMarkdown source={props.markdown}/>
            </div>
            <EpisodeList t={props.t} posts={posts} postsMeta={postsMeta} apiOptions={apiOptions}/>
            <Footer t={props.t}/>
        </div>
    );
}

LandingPage.propTypes = {
    t: cp_t.isRequired,
    markdown: PropTypes.string,
    posts: PropTypes.arrayOf(cp_post).isRequired,
    apiOptions: cp_apiOptions.isRequired,
    settings: cp_settings.isRequired,
    postsMeta: cp_postsMeta,
};