import {v4 as uuidv4} from "uuid";
import fetch from 'isomorphic-unfetch';

// Translate text using Azure translator api.
export default async function handler(req, res) {
    const {from, to} = req.query
    const textToTranslate = req.body.text

    try {
        if (textToTranslate.length > 500) {
            return res.status(400).send({ error: 'Maximum number of words exceeded' })
        }

        let options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.TRANSLATOR_ACCESS_KEY,
                'Ocp-Apim-Subscription-Region': process.env.TRANSLATOR_REGION,
                'X-ClientTraceId': uuidv4().toString(),
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify([{
                'text': textToTranslate
            }]) // body data type must match "Content-Type" header
        }

        const response = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`, options);

        if (response.ok) {
            const trans = await response.json();

            res.status(200).json({text: trans[0].translations[0].text});
        } else {
            const errorBody = await response.json();

            res.status(400).json(JSON.stringify(errorBody))
        }
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch data'})
    }
}
