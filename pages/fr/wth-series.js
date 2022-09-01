import LandingPage from '../../components/templates/LandingPage';
import { getPosts, getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import dictionary from '../../locales/fr';

// Markdown imports
import AboutWthSeries from '../../markdown/fr/AboutWthSeries.md';

export default function WthSeries(props) {
    return (
        <LandingPage
            t={dictionary}
            title={dictionary["WTH Series"]}
            subtitle={dictionary.wthSeriesSlogan}
            description={dictionary.wthSeriesSlogan}
            image="https://busrides-trajetsenbus.csps-efpc.gc.ca/images/wth-series/landingPageBg.jpeg"
            url={`https://busrides-trajetsenbus.csps-efpc.gc.ca/${dictionary.getLocale}/wth-series`}
            markdown={AboutWthSeries}
            posts={props.posts}
            postsMeta={props.postsMeta}
            apiOptions={props.apiOptions}
            settings={props.settings}
        />
    );
}

WthSeries.getInitialProps = async function({req}) {
    const apiOptions = {
        page: 1,
        limit: 10,
        include: "tags,authors",
        filter: `tag:hash-wth-series+tag:${dictionary.getGhostLocaleTag}`
    };
    const posts = await getPosts(apiOptions);
    const settings = await getSettings();

	return {
        posts,
        postsMeta: posts.meta,
        apiOptions,
        settings,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
	};
};
