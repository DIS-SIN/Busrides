import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';
// import styles from '../stylesheets/Home.module.css';

export default function Author(props) {

    console.log(props.postsMeta);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.settings.cover_image}>
                
            </Hero>
            <EpisodeList t={props.t} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions}/>
            <Footer t={props.t}/>
        </div>
    );
}