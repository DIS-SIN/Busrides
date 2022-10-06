import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { cp_t, cp_post, cp_apiOptions, cp_settings, cp_postsMeta } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import PopUpDictionary from '../molecules/PopUpDictionary';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/LandingPage.module.css';

export default function LandingPage(props) {

    const [posts, setPosts] = useState(props.posts);
    const [postsMeta, setPostsMeta] = useState(props.postsMeta);
    const [apiOptions, setApiOptions] = useState(props.apiOptions);

    return (
        <div>
            <MetaTags t={props.t} title={props.title} description={props.description} image={props.image} url={props.url}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.image}>
                <h1>{props.title}</h1>
                <p className={styles.description}>{props.description}</p>
            </Hero>
            <PopUpDictionary t={props.t}/>
            {props.markdown &&
                <div className={styles.contentContainer}>
                    <ReactMarkdown children={props.markdown}/>
                </div>
            }
            <EpisodeList t={props.t} posts={posts} postsMeta={postsMeta} apiOptions={apiOptions}/>
            <Footer t={props.t}/>
        </div>
    );
}

LandingPage.propTypes = {
    t: cp_t.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    markdown: PropTypes.string,
    posts: PropTypes.arrayOf(cp_post).isRequired,
    apiOptions: cp_apiOptions.isRequired,
    settings: cp_settings.isRequired,
    postsMeta: cp_postsMeta,
};
