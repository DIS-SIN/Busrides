import PropTypes from 'prop-types';
import { cp_t, cp_post, cp_apiOptions, cp_tag, cp_settings } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/Home.module.css';

export default function Home(props) {

    console.log(props.settings);

    return (
        <div>
            <MetaTags title={props.t["Busrides"]} description={props.t.getDescription} image={props.settings.url + "thumbnail.jpg"} url={props.t.getLocale === "en" ? props.settings.url : props.settings.url + props.t.getLocale}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.settings.cover_image}>
                <img className={styles.logo} src={props.t.getLogo} alt={props.t["Busrides Logo"]}/>
                <p className={styles.description}>{props.t.getDescription}</p>
            </Hero>
            <EpisodeList t={props.t} posts={props.posts} apiOptions={props.apiOptions}/>
            <h1>Topics:</h1>
            {props.tags.map(tag => (
                <p key={tag.id}>{tag.name}</p>
            ))}
            <Footer t={props.t}/>
        </div>
    );
}

Home.propTypes = {
    t: cp_t.isRequired,
    posts: PropTypes.arrayOf(cp_post).isRequired,
    apiOptions: cp_apiOptions.isRequired,
    tags: PropTypes.arrayOf(cp_tag).isRequired,
    settings: cp_settings.isRequired
};