import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import EpisodeList from '../organisms/EpisodeList';

export default function Home(props) {

    console.log(props);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <Hero t={props.t}/>
            <EpisodeList pages={props.pages} posts={props.posts} tags={props.tags}/>
        </div>
    );
}