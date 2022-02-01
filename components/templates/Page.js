import PropTypes from 'prop-types';
import { cp_t, cp_page, cp_settings } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import PopUpDictionary from '../molecules/PopUpDictionary';
import PostContent from '../organisms/PostContent';
import Footer from '../organisms/Footer';

export default function Page(props) {

    return (
        <div>
            <MetaTags t={props.t} title={props.page.title} description={props.page.excerpt} image={props.page.feature_image} url={props.t.getURL + `${props.t.getLocale}/${props.page.slug}`}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.page.feature_image}>
                <h1>{props.page.title}</h1>
            </Hero>
            <PopUpDictionary t={props.t}/>
            <PostContent html={props.page.html}/>
            <Footer t={props.t}/>
        </div>
    );
}

Page.propTypes = {
    t: cp_t.isRequired,
    page: cp_page.isRequired,
    settings: cp_settings.isRequired
};
