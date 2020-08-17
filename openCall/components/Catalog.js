import React, { useState, useEffect } from 'react';
import { cp_t } from '../../helpers/commonProps';
import styles from './Catalog.module.css';

export default function Catalog(props) {

    const [resources, setResources] = useState([]);

    useEffect(() => {
        getSheetData();
    },[]);

    async function getSheetData() {
        let data = await fetch(`https://spreadsheets.google.com/feeds/list/1sSdxrMjaylypUCbl_vIjcMMUJkQzmd70Ks6qthrz95o/${props.t.getSheetID}/public/values?alt=json`);
        data = await data.json();

        let resourceTypes = [...new Set(data.feed.entry.map(entry => entry.gsx$type.$t))];
        let sortedResources = Array.from(resourceTypes, resourceType => {
            return {
                type: resourceType,
                resources: data.feed.entry.filter(entry => entry.gsx$type.$t === resourceType)
            }
        });
        setResources(sortedResources);
    }

    console.log(resources);

    return (
        <div className={styles.catalog}>
            <h2 className={styles.title}>{props.t["Open Call Catalogue"]}</h2>
            {resources.map(resourceType =>
                <div key={resourceType.type} className={styles.contentBox}>
                    <h3 className={styles.resourceType}>{resourceType.type}</h3>
                    <div className={styles.collection}>
                        {resourceType.resources.map((resource, index) =>
                            <div key={index} className={styles.resource}>
                                <img src={resource.gsx$imageurl.$t} alt={resource.gsx$alttxt.$t}/>
                                {resource.gsx$frenchcaptions ? <figcaption>{resource.gsx$frenchcaptions.$t}</figcaption> : undefined}
                                <h4>{resource.title.$t}</h4>
                                <p>
                                    <b>{props.t["Live link:"] + " "}</b>
                                    <a href={resource.gsx$livelink.$t}>{resource.gsx$livelinktitle.$t}</a>
                                </p>
                                <p>
                                    <b>{props.t["Open source code:"] + " "}</b>
                                    <a href={resource.gsx$codelink.$t}>{resource.gsx$codelinktitle.$t}</a>
                                </p>
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