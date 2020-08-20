import React from 'react';
import PropTypes from 'prop-types';
import { cp_t, cp_settings } from '../helpers/commonProps';
import MetaTags from '../components/molecules/MetaTags';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Catalog from './components/Catalog';
import BannerBlock from './components/BannerBlock';
import NavButton from './components/NavButton';

export default function Home(props) {

    return (
        <div>
            <MetaTags title={props.t["Open Call"]} description={props.t["Open Call Catalogue"]} url={`https://busrides-trajetsenbus.ca${props.t.getLocalePath}/opencall`} image={props.t.getLocale === "fr" ? "https://raw.githubusercontent.com/cds-snc/opencall-appelouvert/master/public/thumbnail_fr.png" : "https://raw.githubusercontent.com/cds-snc/opencall-appelouvert/master/public/thumbnail.png"}/>
            <Header t={props.t} settings={props.settings}/>
            <BannerBlock
                markdown={props.markdown.HelpingGovernmentsRespond}
                image={{
                    src: "https://raw.githubusercontent.com/cds-snc/opencall-appelouvert/master/src/images/codeShare.png",
                    altText: props.t.codeShareAltText
                }}
                colors={{
                    backgroundColor: "#26374a",
                    color: "white"
                }}
            >
                <NavButton t={props.t} text="Learn more" path="/en/en-about"/>
                <NavButton t={props.t} text="Success stories" path="/"/>
            </BannerBlock>
            <Catalog t={props.t}/>
            <BannerBlock
                markdown={props.markdown.HereToHelp}
                image={{
                    src: "https://raw.githubusercontent.com/cds-snc/opencall-appelouvert/master/src/images/clipboard.png",
                    altText: props.t.clipboardAltText
                }}
                colors={{
                    backgroundColor: "#eee",
                    color: "black"
                }}
            >
                <NavButton t={props.t} text="FAQs" path="/"/>
            </BannerBlock>
            <BannerBlock
                markdown={props.markdown.OpenCallCommunity}
                colors={{
                    backgroundColor: "#26374a",
                    color: "white"
                }}
            />
            <Footer t={props.t}/>
        </div>
    );
}

Home.propTypes = {
    t: cp_t.isRequired,
    settings: cp_settings.isRequired,
    markdown: PropTypes.objectOf(PropTypes.string)
};