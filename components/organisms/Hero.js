import PropTypes from 'prop-types';
import { cp_children } from '../../helpers/commonProps';
import styles from '../stylesheets/Hero.module.css';

export default function Hero(props) {

    return (
        <div className={styles.hero}>
            <div className={styles.contentContainer}>
                {props.children}
            </div>
            <div className={styles.backgroundContainer} style={{backgroundImage: `url(${props.backgroundImage})`}}>
                <div className={styles.backgroundBlur}/>
            </div>
        </div>
    );
}

Hero.propTypes = {
    backgroundImage: PropTypes.string,
    children: cp_children
};