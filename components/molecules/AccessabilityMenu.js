import React, { useState } from 'react';
import Tippy from '@tippy.js/react';
import { cp_t } from '../../helpers/commonProps';

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

    function toggleGrayscale() {
        updateFilter(/grayscale\(\d*\%\)/g, `grayscale(${!grayscale ? 100 : 0}%)`);
        setGrayscale(!grayscale);
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
            <React.Fragment>
                <div>
                    <button onClick={() => zoom(1)}>Zoom in</button>
                    <button onClick={() => zoom(-1)}>Zoom out</button>
                    <button onClick={() => zoom()}>Reset Zoom</button>
                </div>
                <div>
                    <button onClick={() => contrast(1)}>Increase Contrast</button>
                    <button onClick={() => contrast(-1)}>Decrease Contrast</button>
                    <button onClick={() => contrast()}>Reset Contrast</button>
                </div>
                <button onClick={toggleGrayscale}>Toggle Grayscale</button>
            </React.Fragment>
        }
        visible={isOpen}
        interactive={true}>
            <button onClick={() => setIsOpen(!isOpen)}>Open</button>
        </Tippy>
    );
}

AccessabilityMenu.propTypes = {
    t: cp_t.isRequired,
};