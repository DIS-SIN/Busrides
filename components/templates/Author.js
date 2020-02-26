import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import AuthorDetails from '../molecules/AuthorDetails';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';
// import styles from '../stylesheets/Home.module.css';

export default function Author(props) {

    console.log(props);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.author.cover_image}>
                <AuthorDetails t={props.t} authorPage authors={[props.author]} numberOfPosts={props.postsMeta.pagination.total}/>
            </Hero>
            <EpisodeList t={props.t} posts={props.posts} postsMeta={props.postsMeta} apiOptions={props.apiOptions}/>
            <Footer t={props.t}/>
        </div>
    );
}