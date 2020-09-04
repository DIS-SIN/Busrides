import Home from '../../openCall/Home';
import { getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import dictionary from '../../locales/fr';

// Markdown imports
import HelpingGovernmentsRespond from '../../openCall/markdown/fr/HelpingGovernmentsRespond.md';
import HereToHelp from '../../openCall/markdown/fr/HereToHelp.md';
import OpenCallCommunity from '../../openCall/markdown/fr/OpenCallCommunity.md';

export default function OpenCall(props) {
    return (
        <Home 
            t={dictionary}
            settings={props.settings}
            markdown={{
                HelpingGovernmentsRespond,
                HereToHelp,
                OpenCallCommunity
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