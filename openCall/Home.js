import React from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Catalog from './components/Catalog';
import BannerBlock from './components/BannerBlock';
import NavButton from './components/NavButton';

export default function Home(props) {

    return (
        <div>
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
                <NavButton t={props.t} tagClass="aboutPageLink" text="Learn more" path="/en/en-about"/>
                <NavButton t={props.t} tagClass="completedProjectsPageLink" text="Success stories" path="/"/>
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
                <NavButton t={props.t} tagClass="faqPageLink" text="FAQs" path="/"/>
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