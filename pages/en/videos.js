import LandingPage from '../../components/templates/LandingPage';
import { getPosts, getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import dictionary from '../../locales/en';

export default function Videos(props) {
    return (
        <LandingPage 
            t={dictionary}
            title={dictionary["Videos"]}
            description={dictionary.VideosSlogan}
            image="https://busrides-trajetsenbus.ca/images/videos/videosBg.jpg"
            url={`https://busrides-trajetsenbus.ca/${dictionary.getLocale}/videos`}
            posts={props.posts}
            postsMeta={props.postsMeta}
            apiOptions={props.apiOptions}
            settings={props.settings}
        />
    );
}

Videos.getInitialProps = async function({req}) {
    const apiOptions = {
        page: 1,
        limit: 10,
        include: "tags,authors",
        filter: `tag:hash-video+tag:${dictionary.getGhostLocaleTag}`
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