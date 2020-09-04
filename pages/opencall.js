import Home from '../openCall/Home';
import { getSettings } from '../Ghost-API/contentAPI';
import { getUserAgent } from '../helpers/helpers';
import dictionary from '../locales/en';

// Markdown imports
import HelpingGovernmentsRespond from '../openCall/markdown/en/HelpingGovernmentsRespond.md';
import HereToHelp from '../openCall/markdown/en/HereToHelp.md';
import OpenCallCommunity from '../openCall/markdown/en/OpenCallCommunity.md';

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