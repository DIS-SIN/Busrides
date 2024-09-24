import {v4 as uuidv4} from "uuid";
import fetch from 'isomorphic-unfetch';

// Get redirect url for busrides api for client side calls.
export default async function handler(req, res) {
    const {lang, slug} = req.query
    const ghostURL = `https://busrides.ghost.io/${lang}/${slug}`;
    try {
        let options = {
            method: 'GET',
            redirect: 'manual',
        };
        const response = await fetch(ghostURL, options);

        if (response.status > 300 && response.status < 400 && response.headers.get('Location').startsWith('https')) {
            res.status(200).json({redirectUrl: response.headers.get('Location')});
        } else {
            res.status(404).json({error: 'No redirect found'})
        }
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch data'})
    }
}
