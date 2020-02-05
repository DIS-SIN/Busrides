import Header from '../organisms/Header';
import EpisodeList from '../organisms/EpisodeList';

export default function Home(props) {

    console.log(props.settings)

    return (
        <div>
            <Header settings={props.settings} t={props.t}/>
            <EpisodeList pages={props.pages} posts={props.posts} tags={props.tags}/>
        </div>
    );
}