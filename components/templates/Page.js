import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import PostContent from '../organisms/PostContent';
import Footer from '../organisms/Footer';

export default function Page(props) {

    return (
        <div>
            <MetaTags title={props.page.title} description={props.page.excerpt} image={props.page.feature_image} url={props.settings.url + `${props.t.getLocale}/${props.page.slug}`}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.page.feature_image}>
                <h1>{props.page.title}</h1>
            </Hero>
            <PostContent html={props.page.html}/>
            <Footer t={props.t}/>
        </div>
    );
}