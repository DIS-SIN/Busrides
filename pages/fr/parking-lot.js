import ParkingLot from '../../components/templates/ParkingLot';
import { getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import dictionary from '../../locales/fr';

// Markdown imports
import AboutParkingLot from '../../markdown/fr/AboutParkingLot.md';

export default function OpenCall(props) {
    return (
        <ParkingLot 
            t={dictionary}
            settings={props.settings}
            markdown={{
                AboutParkingLot
            }}
        />
    );
}

OpenCall.getInitialProps = async function({req}) {

    const settings = await getSettings();

	return {
        settings,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
	};
};