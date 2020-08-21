import PropTypes from 'prop-types';
import { cp_t, cp_author, cp_post, cp_settings, cp_postsMeta } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import AuthorDetails from '../molecules/AuthorDetails';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';

export default function Author(props) {

    console.log(props);

    return (
        <div>
            <MetaTags title={props.author.name} description={props.author.bio} image={props.author.profile_image} url={props.author.url}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.author.cover_image}>
                <AuthorDetails t={props.t} authorPage authors={[props.author]} numberOfPosts={props.postsMeta.pagination.total}/>
            </Hero>
            <EpisodeList t={props.t} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions}/>
            <Footer t={props.t}/>
        </div>
    );
}

Author.propTypes = {
    t: cp_t.isRequired,
    author: cp_author.isRequired,
    posts: PropTypes.arrayOf(cp_post).isRequired,
    postsMeta: cp_postsMeta.isRequired,
    settings: cp_settings
};