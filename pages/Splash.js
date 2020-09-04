import {GCSplashScreen} from 'gc-tortilla';
import { getSettings } from '../Ghost-API/contentAPI';
import { getUserAgent } from '../helpers/helpers';

export default function Splash(props) {
    return (
        <GCSplashScreen
            logo={{
                image: props.settings.logo,
                altText: "Busrides Icon"
            }}
            backgroundImage={props.settings.cover_image}
            routes={{
                english: "/",
                french: "/fr"
            }}
        />
    );
}

Splash.getInitialProps = async function({req}) {
    const settings = await getSettings();

	return {
        settings,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
	};
};