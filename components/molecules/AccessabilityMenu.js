import React, { useState } from 'react';
import Tippy from '@tippy.js/react';
import Switch from '@material-ui/core/Switch';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t } from '../../helpers/commonProps';
import styles from '../stylesheets/AccessabilityMenu.module.css';

export default function AccessabilityMenu(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [contrastLevel, setContrastLevel] = useState(100);
    const [grayscale, setGrayscale] = useState(false);
    const [filter, setFilter] = useState("");

    function zoom(directionMultiplier) {
        let newZoomLevel = getNewLevel(directionMultiplier, zoomLevel);
        setZoomLevel(newZoomLevel);
        document.body.style.zoom = `${newZoomLevel}%`;
    }

    function contrast(directionMultiplier) {
        let newContrastLevel = getNewLevel(directionMultiplier, contrastLevel);
        setContrastLevel(newContrastLevel);
        updateFilter(/contrast\(\d*\%\)/g, `contrast(${newContrastLevel}%)`);
    }

    function toggleGrayscale(ev) {
        setGrayscale(ev.target.checked)
        updateFilter(/grayscale\(\d*\%\)/g, `grayscale(${ev.target.checked ? 100 : 0}%)`);
    }

    function getNewLevel(directionMultiplier, level) {
        if (directionMultiplier){
            return level + (directionMultiplier * 10);
        }
        else {
            return 100;
        }
    }

    function updateFilter(regex, filterString) {
        let newFilter;
        if (filter.match(regex)){
            newFilter = filter.replace(regex, filterString);
        }
        else {
            newFilter = filter + ` ${filterString}`;
        }
        setFilter(newFilter);
        document.body.style.filter = newFilter;
    }

    return (
        <Tippy
        content={
            <div className={styles.menu}>
                <div>
                    <button onClick={() => zoom(-1)} aria-label={props.t["ZoomIn"]}>-</button>
                    <IcomoonReact iconSet={iconSet} size={20} icon="zoom-in"/>
                    <button onClick={() => zoom(1)} aria-label={props.t["ZoomOut"]}>+</button>
                    {/* <button onClick={() => zoom()}>Reset Zoom</button> */}
                </div>
                <div>
                    <button onClick={() => contrast(-1)} aria-label={props.t["DecreaseContrast"]}>-</button>
                    <IcomoonReact iconSet={iconSet} size={20} icon="contrast"/>
                    <button onClick={() => contrast(1)} aria-label={props.t["IncreaseContrast"]}>+</button>
                    {/* <button onClick={() => contrast()}>Reset Contrast</button> */}
                </div>
                <div>
                    <p>{props.t["Grayscale"]}</p>
                    <Switch
                        onChange={toggleGrayscale}
                        color="default"
                        inputProps={{ 'aria-label': props.t["ToggleGrayscale"]} }
                    />
                </div>
            </div>
        }
        visible={isOpen}
        interactive={true}>
            <button className={styles.button} onClick={() => setIsOpen(!isOpen)} title={props.t["Accessibility settings"]}>
                <IcomoonReact iconSet={iconSet} size={20} icon="accessible"/>
            </button>
        </Tippy>
    );
}

AccessabilityMenu.propTypes = {
    t: cp_t.isRequired,
};
