import React, { useEffect, useMemo, useState } from 'react';
import Tippy from '@tippy.js/react';
import fetch from 'isomorphic-unfetch';
import { v4 as uuidv4 } from 'uuid';
import { useTextSelection } from 'use-text-selection';
import useCountDown from 'react-countdown-hook';
import { cp_t } from '../../helpers/commonProps';

export default function PopUpDictionary(props) {

    const [definition, setDefinition] = useState(null);
    const [translation, setTranslation] = useState(null);

    const [timeLeft, { start, pause, resume, reset }] = useCountDown(500, 500);
    const { textContent, clientRect, isCollapsed } = useTextSelection();

    useEffect(() => {
        if (process.browser){
            setDefinition(null);
            reset();
            start();
        }
    },[textContent]);

    useEffect(() => {
        if (process.browser && timeLeft == 0 && textContent && textContent.match(/[a-zA-Z]/)){
            if (!textContent.trim().includes(" ")){
                getDefinition();
            }
            if (textContent.length <= 500){
                getTranslation();
            }
        }
    },[timeLeft]);

    const pageYOffset = useMemo(() => {
        if (process.browser){
            return window.pageYOffset;
        }
    },[textContent]);

    async function getDefinition() {
        console.log(textContent.trim());
        try {
            let def = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${props.t.getLocale === "en" ? "en_US" : props.t.getLocale}/${textContent.trim()}`);
            def = await def.json();
            if (def[0]){
                setDefinition(def[0].meanings[0].definitions[0].definition);
            }
            else {
                setDefinition(null);
            }
        } catch (error) {
            setDefinition(null);
        }
    }

    async function getTranslation() {
        let options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Ocp-Apim-Subscription-Key': "cfe1d8fa97bc4908b8c6294b5fdbbdcb",
                'Ocp-Apim-Subscription-Region': "canadacentral",
                'X-ClientTraceId': uuidv4().toString(),
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify([{
                'text': textContent
            }]) // body data type must match "Content-Type" header
        }

            let trans = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${props.t.getLocale}&to=${props.t.getOppositeLocale}`, options);
            trans = await trans.json();
            setTranslation(trans[0].translations[0].text);
    }

    return (
        <Tippy
        content={
            <React.Fragment>
                <h3>{textContent}</h3>
                <p>{definition}</p>
                <hr/>
                <p>{translation}</p>
            </React.Fragment>
        }
        visible={!isCollapsed && timeLeft == 0 && (definition != null || translation != null) && textContent != null && textContent.length <= 500 && textContent.match(/[a-zA-Z]/) != null}>
            <div style={clientRect && { left: clientRect.x, top: clientRect.y + pageYOffset, position: "absolute" }}/>
        </Tippy>
    );
}

PopUpDictionary.propTypes = {
    t: cp_t.isRequired,
};