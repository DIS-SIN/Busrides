import React, { useState, useEffect } from 'react';
import { cp_t } from '../../helpers/commonProps';
import styles from '../stylesheets/Catalog.module.css';

export default function Catalog(props) {

    const [resources, setResources] = useState([]);

    useEffect(() => {
        getSheetData();
    },[]);

    async function getSheetData() {
        let data = await fetch(`https://spreadsheets.google.com/feeds/list/1mkpuyaRZnHeyJtR_KuKapCImoU8cSYVJt_EUoZ5DflA/${props.t.getSheetID}/public/values?alt=json`);
        data = await data.json();

        let resourceTypes = [...new Set(data.feed.entry.map(entry => entry.gsx$topic.$t))];
        let sortedResources = Array.from(resourceTypes, resourceType => {
            return {
                type: resourceType,
                resources: data.feed.entry.filter(entry => entry.gsx$topic.$t === resourceType)
            }
        });
        setResources(sortedResources);
    }

    return (
        <div className={styles.catalog}>
            <h2 className={styles.title}>{props.t["Parking Lot"]}</h2>
            {resources.map(resourceType =>
                <div key={resourceType.type} className={styles.contentBox}>
                    <h3 className={styles.resourceType}>{resourceType.type}</h3>
                    <div className={styles.collection}>
                        {resourceType.resources.map((resource, index) =>
                            <div key={index} className={styles.resource}>
                                <img src={`/images/parkingLotThumbnails/${props.t["getLocale"]}/${resource.gsx$imagename.$t}`} alt={resource.gsx$alttxt.$t}/>
                                {resource.gsx$frenchcaptions ? <figcaption>{resource.gsx$frenchcaptions.$t}</figcaption> : undefined}
                                <a href={resource.gsx$url.$t} target="_blank">
                                    <h4>{resource.title.$t}</h4>
                                </a>
                                <p>{resource.gsx$description.$t}</p>
                            </div>
                        )}
                        {3 % resourceType.resources.length != 0 ?
                            <div className={styles.resource}></div>
                        : undefined}
                    </div>
                </div>
            )}
        </div>
    );
}

Catalog.propTypes = {
    t: cp_t.isRequired
};
