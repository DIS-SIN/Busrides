import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import PostContent from '../organisms/PostContent';
import Footer from '../organisms/Footer';

export default function Page(props) {

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.page.feature_image}>
                <h1>{props.page.title}</h1>
            </Hero>
            <PostContent html={props.page.html}/>
            <Footer t={props.t}/>
        </div>
    );
}