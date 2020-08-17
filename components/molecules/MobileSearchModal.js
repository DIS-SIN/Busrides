import PropTypes from 'prop-types';
import { cp_t } from '../../helpers/commonProps';
import FullSearchBar from './FullSearchBar';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import styles from '../stylesheets/MobileSearchModal.module.css';

export default function MobileSearchModal(props) {

    return (
        <div className={styles.mobileSearchModal}>
            <div className={styles.closeButton} onClick={() => props.openSearchMenu(false)}>
                <IcomoonReact iconSet={iconSet} size={10} icon="close"/>
            </div>
            <FullSearchBar t={props.t} initialSearch autofocus/>
        </div>
    );
}

MobileSearchModal.propTypes = {
    t: cp_t.isRequired,
    openSearchMenu: PropTypes.func.isRequired
};