import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';

export default function Tag(props) {

    console.log(props);

    return (
        <div>
            <MetaTags title={props.tag.name} description={props.tag.description} image={props.tag.feature_image} url={props.tag.url}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.tag.feature_image}>
                <h1>{props.tag.name}</h1>
            </Hero>
            <EpisodeList t={props.t} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions}/>
            <Footer t={props.t}/>
        </div>
    );
}