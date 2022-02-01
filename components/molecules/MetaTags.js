import Head from 'next/head';
import PropTypes from 'prop-types';
import { cp_t } from "../../helpers/commonProps";

export default function MetaTags(props) {

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{props.title}</title>
            <meta name="title" content={props.title}/>
            <meta name="description" content={props.description}/>
            <meta name="author" content={props.t.metaAuthor}/>

            {/* GC tags */}
            <meta name="dcterms.title" content={props.title}/>
            <meta name="dcterms.description" content={props.description}/>
            <meta name="dcterms.language" title="ISO639-2/T" content={props.t.getLocaleAlpha3}/>
            <meta name="dcterms.creator" content={props.t.metaAuthor}/>
            <meta name="dcterms.subject" title="scheme" content={props.t.metaSubject}/>

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={props.url}/>
            <meta property="og:title" content={props.title}/>
            <meta property="og:description" content={props.description}/>
            <meta property="og:image" content={props.image}/>

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={props.url}/>
            <meta property="twitter:title" content={props.title}/>
            <meta property="twitter:description" content={props.description}/>
            <meta property="twitter:image" content={props.image}/>
        </Head>
    );
}

MetaTags.propTypes = {
    t: cp_t.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};
