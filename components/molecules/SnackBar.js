import { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import {getTag} from "../../Ghost-API/contentAPI";
import styles from '../stylesheets/SnackBar.module.css';

export default function SnackBar(props) {

    const [snackBarContent, setSnackBarContent] = useState(null);
    const [showSnackBar, setShowSnackBar] = useState(false);

    useEffect(() => {
        getMessage();
    },[]);

    async function getMessage() {
        let message = await getTag("hash-snackbar");
        message = JSON.parse(message.codeinjection_head);
        setSnackBarContent(message);
        checkMessage(message);
        if (localStorage){
            localStorage.snackBarContent = JSON.stringify(message);
        }
    }

    function checkMessage(message) {
        let now = moment();
        let releaseDate = moment(message.releaseDate);
        let expiryDate = moment(message.expiryDate);
        
        if (now.isBefore(releaseDate) || now.isSameOrAfter(expiryDate)){
            setShowSnackBar(false);
        }
        else if (localStorage && localStorage.snackBarContent && isEqual(message, JSON.parse(localStorage.snackBarContent))){
            setShowSnackBar(false);
        }
        else {
            setShowSnackBar(true);
        }
    }

        return (
            <Snackbar open={showSnackBar} onClose={() => setShowSnackBar(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                {snackBarContent && props.locale &&
                    <div className={styles.snackBar}>
                        <p>{snackBarContent.message[props.locale] + " "}
                            <a href={snackBarContent.links[props.locale].link}>{snackBarContent.links[props.locale].label}</a>
                        </p>
                        <div className={styles.closeIcon} onClick={() => setShowSnackBar(false)}>
                            <IcomoonReact iconSet={iconSet} size={20} icon="close"/>
                        </div>
                    </div>
                }
            </Snackbar>
        );
}

SnackBar.propTypes = {
    locale: PropTypes.string.isRequired
};
