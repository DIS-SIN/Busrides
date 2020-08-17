import PropTypes from 'prop-types';
import { cp_children } from '../../helpers/commonProps';
import styles from '../stylesheets/Hero.module.css';

export default function Hero(props) {

    return (
        <div className={styles.hero} style={{backgroundImage: `url(${props.backgroundImage})`}}>
            {props.children}
        </div>
    );
}

Hero.propTypes = {
    backgroundImage: PropTypes.number,
    children: cp_children
};