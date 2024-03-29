import LandingPage from '../../components/templates/LandingPage';
import { getPosts, getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import dictionary from '../../locales/en';

// Markdown imports
import AboutLearningPaths from '../../markdown/en/AboutLearningPaths.md';

export default function LearningPaths(props) {
    return (
        <LandingPage 
            t={dictionary}
            title={dictionary["Learning Paths"]}
            subtitle={dictionary.learningPathsSlogan}
            description={dictionary.learningPathsSlogan}
            image="https://busrides-trajetsenbus.csps-efpc.gc.ca/images/learning-paths/landingPageBg.jpeg"
            url={`https://busrides-trajetsenbus.csps-efpc.gc.ca/${dictionary.getLocale}/learning-paths`}
            markdown={AboutLearningPaths}
            posts={props.posts}
            postsMeta={props.postsMeta}
            apiOptions={props.apiOptions}
            settings={props.settings}
        />
    );
}

LearningPaths.getInitialProps = async function({req}) {
    const apiOptions = {
        page: 1,
        limit: 10,
        include: "tags,authors",
        filter: `tag:hash-learning-path+tag:${dictionary.getGhostLocaleTag}`
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
