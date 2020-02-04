import Head from 'next/head';
import Header from '../components/Header';
import EpisodeList from '../components/EpisodeList';
import { getPosts, getPages, getTags, getSettings } from '../Ghost-API/contentAPI';

export default function Index(props) {

    console.log(props.settings)

    return (
        <div>
            <Head>
                <title>French</title>
            </Head>
            <Header settings={props.settings}/>
            <EpisodeList pages={props.pages} posts={props.posts} tags={props.tags}/>
        </div>
    );
}

Index.getInitialProps = async function() {
    const posts = await getPosts();
    const pages = await getPages();
    const tags = await getTags();
    const settings = await getSettings();

	return {
        posts,
        pages,
        tags,
        settings
	};
};