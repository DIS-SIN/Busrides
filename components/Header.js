import styles from '../stylesheets/Header.module.css';

export default function Header(props) {
    return (
        <div className={styles.header}>
            <ul className={styles.navItems}>
                <li>
                    <a href="/">
                        <img src={props.settings.logo} alt={props.settings.title}/>
                    </a>
                </li>
                <li>
                    <a href="/">Home</a>
                </li>

                <li></li>
            </ul>
        </div>
    );
}