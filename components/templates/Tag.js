import PropTypes from 'prop-types';
import { cp_t, cp_apiOptions, cp_post, cp_postsMeta, cp_settings, cp_tag } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';

export default function Tag(props) {

    return (
        <div>
            <MetaTags t={props.t} title={props.tag.name} description={props.tag.description} image={props.tag.feature_image} url={`${props.t.getURL}${props.t.getLocale === "en" ? "" : "fr/"}tag/${props.tag.slug}`}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.tag.feature_image}>
                <h1>{props.tag.name}</h1>
            </Hero>
            <EpisodeList t={props.t} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions}/>
            <Footer t={props.t}/>
        </div>
    );
}

Tag.propTypes = {
    t: cp_t.isRequired,
    apiOptions: cp_apiOptions.isRequired,
    posts: PropTypes.arrayOf(cp_post).isRequired,
    postsMeta: cp_postsMeta.isRequired,
    settings: cp_settings.isRequired,
    tag: cp_tag.isRequired
};
