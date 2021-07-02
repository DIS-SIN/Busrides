import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import {useScrollPercentage} from 'react-scroll-percentage';
import { cp_t, cp_post, cp_settings } from '../../helpers/commonProps';
import { htmlToPlainText } from '../../helpers/helpers';
import MetaTags from '../molecules/MetaTags';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import PostContent from '../organisms/PostContent';
import PopUpDictionary from '../molecules/PopUpDictionary';
import ShareButtons from '../molecules/ShareButtons';
import AuthorDetails from '../molecules/AuthorDetails';
import EpisodeList from '../organisms/EpisodeList';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/Episode.module.css';

export default function Episode(props) {

    const [contentArea, scrollPercentage] = useScrollPercentage();

    // Converting the HTML to PlainText to be used in Polly
    console.log(htmlToPlainText(props.post.html));

    return (
        <div>
            <MetaTags title={props.post.title} description={props.post.excerpt} image={props.post.feature_image} url={`${props.t.getURL}${props.t.getLocale === "en" ? "en" : "fr"}/${props.post.slug}`}/>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.post.feature_image}/>
            <PopUpDictionary t={props.t}/>
            <div className={styles.contentArea} ref={contentArea}>
                <ShareButtons t={props.t} post={props.post} scrollPercentage={scrollPercentage}/>
                <div className={styles.heading}>
                    <h1 className={styles.title}>{props.post.title}</h1>
                    <div className={styles.metaDetails}>
                        <Link href={`${props.t.getLocalePath}/tag/[slug]`} as={`${props.t.getLocalePath}/tag/${props.post.primary_tag.slug}`}>
                            <a>{props.post.primary_tag.name}</a>
                        </Link>
                        <span>•</span>
                        <span>{moment(props.post.published_at).format("MM-DD-YYYY")}</span>
                    </div>
                </div>
                <PostContent html={props.post.html}/>
            </div>
            <AuthorDetails t={props.t} episodePage authors={props.post.authors}/>
            <div className={styles.recommendedPosts}>
                <h3>{props.t["Recommended for you"]}</h3>
                <EpisodeList t={props.t} posts={props.recommendedPosts}/>
            </div>
            <Footer t={props.t}/>
        </div>
    );
}

Episode.propTypes = {
    t: cp_t.isRequired,
    post: cp_post.isRequired,
    recommendedPosts: PropTypes.arrayOf(cp_post).isRequired,
    settings: cp_settings.isRequired
};