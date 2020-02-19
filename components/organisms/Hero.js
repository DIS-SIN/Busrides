import styles from '../stylesheets/Hero.module.css';

export default function Hero(props) {

    return (
        <div className={styles.hero}>
            <img className={styles.logo} src={props.t.getLogo}/>
            <p className={styles.description}>{props.t.getDescription}</p>
        </div>
    );
}