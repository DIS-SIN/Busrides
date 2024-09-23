import { getPost, getPage, getPosts, getSettings } from '../../Ghost-API/contentAPI';
import { getUserAgent } from '../../helpers/helpers';
import Episode from '../../components/templates/Episode';
import Page from '../../components/templates/Page';
import dictionary from '../../locales/fr';
import ErrorPage from '../_error';

export default function Post(props) {
    if (props.error){
        return <ErrorPage errorCode={404} />
    }

    if (props.post){
       return <Episode t={dictionary} post={props.post} settings={props.settings} recommendedPosts={props.recommendedPosts}/>
    }

    return (
        <Page t={dictionary} page={props.page} settings={props.settings}/>
    );
}

Post.getInitialProps = async function({query, res, req}) {

    const props = new Object();

    props.post = await getPost(query.slug);

    if (props.post){
        const ghostURL = 'https://busrides.ghost.io/fr/' + query.slug;
        if (typeof window === "undefined") {
            // Server-side-only code
            try {
                const response = await fetch(ghostURL, { method: 'GET', redirect: 'manual' });
                if (response.status === 301 && response.headers.get('Location').startsWith('https')){
                    if (res && response.headers.get('Location')) {
                        res.writeHead(301, { Location: response.headers.get('Location') })
                        res.end()
                        return {};
                    }
                }
            } catch (error) {
                
            }
        }
    };
    
    props.settings = await getSettings();

    if (!props.post){
        props.page = await getPage(query.slug);
        
        if (!props.page){
            res.statusCode = 404
            return {error: true};
        }
    }
    else {
        props.recommendedPosts = await getPosts({
            limit: 3,
            filter: `tag:${dictionary.getGhostLocaleTag}+tags:[${Array.from(props.post.tags, tag => tag.slug)}]+id:-${props.post.id}`,
            include: "tags,authors",
        });
    }

	return {
        ...props,
        locale: dictionary.getLocale,
        userAgent: getUserAgent(req)
    };
};
