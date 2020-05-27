import fetch from 'isomorphic-unfetch';

export async function getSearchResults(searchTerm, localeTag){
    let data = await fetch(`https://busrides-trajetsenbus.ca/search?q=${encodeURI(searchTerm)}+AND+tags.tag=${localeTag}`);
    data = await data.json();
    return data;
}