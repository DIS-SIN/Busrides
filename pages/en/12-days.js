import { getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import Episode from '../../components/templates/Episode';
import Page from '../../components/templates/Page';
import TwelveDays from '../../components/templates/TwelveDays';
import dictionary from '../../locales/en';
import ErrorPage from '../_error';

export default function twelveDays(props) {

    return (
        <TwelveDays t={dictionary} settings={props.settings}/>
    );
}

twelveDays.getInitialProps = async function({query, req}) {

    let settings = await getSettings();

	return {
        settings: settings,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
    };
};