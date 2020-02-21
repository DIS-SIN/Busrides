import styles from '../stylesheets/PostContent.module.css';

export default function PostContent(props) {

    return (
        <div className={styles.postContent} dangerouslySetInnerHTML={{__html: props.html}}/>  
    );
}