import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/Home.module.css';

export default function Home(props) {

    console.log(props.settings);

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.settings.cover_image}>
                <img className={styles.logo} src={props.t.getLogo}/>
                <p className={styles.description}>{props.t.getDescription}</p>
            </Hero>
            <EpisodeList t={props.t} posts={props.posts}/>
            <h1>Topics:</h1>
            {props.tags.map(tag => (
                <p key={tag.id}>{tag.name}</p>
            ))}
            <Footer t={props.t}/>
        </div>
    );
}