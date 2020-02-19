import Header from '../organisms/Header';
import EpisodeList from '../organisms/EpisodeList';

export default function Home(props) {

    console.log(props.posts);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <EpisodeList pages={props.pages} posts={props.posts} tags={props.tags}/>
        </div>
    );
}