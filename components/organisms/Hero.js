import styles from '../stylesheets/Hero.module.css';

export default function Hero(props) {

    return (
        <div className={styles.hero} style={{backgroundImage: `url(${props.backgroundImage})`}}>
            {props.children}
        </div>
    );
}