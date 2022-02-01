import React from 'react';
import PropTypes from 'prop-types';
import { cp_t, cp_settings } from '../../helpers/commonProps';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Catalog from '../organisms/Catalog';
import BannerBlock from '../organisms/BannerBlock';

export default function Home(props) {

    return (
        <div>
            <MetaTags t={props.t} title={props.t["Parking Lot"]} description={props.t["Parking Lot"]} url={`${props.t.getURL}${props.t.getLocale === "en" ? "" : "fr"}/parking-lot`} image={"/images/thumbnails/parkingLot.png"}/>
            <Header t={props.t} settings={props.settings}/>
            <BannerBlock
                markdown={props.markdown.AboutParkingLot}
                image={{
                    src: "/images/parkingLot.png",
                    altText: props.t.codeShareAltText
                }}
                colors={{
                    backgroundColor: "#26374a",
                    color: "white"
                }}
            >
            </BannerBlock>
            <Catalog t={props.t}/>
            <Footer t={props.t}/>
        </div>
    );
}

Home.propTypes = {
    t: cp_t.isRequired,
    settings: cp_settings.isRequired,
    markdown: PropTypes.objectOf(PropTypes.string)
};
