import { getSettings } from '../../../Ghost-API/contentAPI';
import { getUserAgent } from '../../../helpers/helpers';
import TwelveDays from '../../../components/templates/TwelveDays';
import Data2019 from '../../../components/12-days/data/en/data-2019.json';
import dictionary from '../../../locales/en';
import ErrorPage from '../../_error';

export default function twelveDays(props) {

    if (props.data){
        return (
            <TwelveDays t={dictionary} data={props.data} settings={props.settings}/>
        );
    }

    return <ErrorPage errorCode={404} />
}

twelveDays.getInitialProps = async function({query, req}) {

    let settings = await getSettings();

    let data = query.slug.toLowerCase() == "data" ? Data2019 : null;

	return {
        data: data,
        settings: settings,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
    };
};