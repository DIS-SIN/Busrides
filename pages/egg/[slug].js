import { getUserAgent } from '../../helpers/helpers';
import Egg from '../../components/templates/Egg';
import dictionary from '../../locales/en';
import ErrorPage from '../_error';

export default function EmbedEgg(props) {

    return (
        <Egg id={props.id}/>
    );
}

EmbedEgg.getInitialProps = async function({query, res, req}) {
	return {
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req),
        id: query.slug
	};
};