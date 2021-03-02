import { getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import EggHunt from '../../components/templates/EggHunt';
import dictionary from '../../locales/en';

export default function EggHuntPage(props) {
    return (
        <EggHunt t={dictionary} settings={props.settings}/>
    );
}

EggHuntPage.getInitialProps = async function({req}) {

    const settings = await getSettings();

	return {
        settings,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
	};
};