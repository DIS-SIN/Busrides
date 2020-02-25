import moment from 'moment';
import {useScrollPercentage} from 'react-scroll-percentage';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import PostContent from '../organisms/PostContent';
import ShareButtons from '../molecules/ShareButtons';
import AuthorDetails from '../molecules/AuthorDetails';
import Comments from '../organisms/Comments';
import Footer from '../organisms/Footer';
import styles from '../stylesheets/Episode.module.css';

export default function Episode(props) {

    console.log(props.post);

    const [contentArea, scrollPercentage] = useScrollPercentage();

    return (
        <div>
            <Header t={props.t} settings={props.settings}/>
            <Hero backgroundImage={props.post.feature_image}/>
            <div className={styles.contentArea} ref={contentArea}>
                <ShareButtons post={props.post} scrollPercentage={scrollPercentage}/>
                <div className={styles.heading}>
                    <h1 className={styles.title}>{props.post.title}</h1>
                    <div className={styles.metaDetails}>
                        <a>{props.post.primary_tag.name}</a>
                        <span>•</span>
                        <span>{moment(props.post.published_at).format("MM-DD-YYYY")}</span>
                    </div>
                </div>
                <PostContent html={props.post.html}/>
            </div>
            <AuthorDetails t={props.t} episodePage authors={props.post.authors}/>
            <Comments fullUrl={props.post.url} id={props.post.comment_id}/>
            <Footer t={props.t}/>
        </div>
    );
}