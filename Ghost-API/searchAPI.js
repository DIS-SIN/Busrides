import fetch from 'isomorphic-unfetch';
import moment from 'moment';
import { getPosts } from '../Ghost-API/contentAPI';

export async function getSearchResults(searchTerm, localeTag, from = 0, sortBy = "popularity:desc"){
    let newResults = await getLocalSearchResults(searchTerm, localeTag, sortBy);
    return newResults;
    
    // let data = await fetch(`https://busrides-trajetsenbus.ca/search?q=${encodeURI(searchTerm)}+AND+tags.tag=${encodeURI(localeTag)}&from=${from}&sort=${sortBy}`);
    // data = await data.json();
    // data.searchTerm = searchTerm;
    // data.sortBy = sortBy;
    // return formatData(data);
}

// This function formats the returned data to match the existing Ghost APIs
function formatData(searchResults) {
    let posts = searchResults.hits.hits.map(result => {
        return {
            id: result._id,
            published_at: new Date(result._source.published_at * 1000),
            html: result._source.html,
            slug: result._source.slug,
            feature_image: result._source.feature_image,
            primary_author: {
                name: result._source.author[0].name,
                slug: result._source.author[0].slug,
                profile_image: result._source.author[0].profile_image
            },
            primary_tag: {
                slug: result._source.tags[0].slug,
                name: result._source.tags[0].name
            },
            tags: result._source.tags,
            title: result._source.title,
            excerpt: result._source.excerpt,
            authors: result._source.author
        }
    });
    return {
        posts,
        total: searchResults.hits.total.value,
        searchTerm: searchResults.searchTerm,
        sortBy: searchResults.sortBy
    }
}


// Temp front end search system

export async function getLocalSearchResults(searchTerm, localeTag, sortBy) {
    let posts = await getLocalPosts(localeTag);
    
    let results = posts.filter(post => {
        if (post.title.toLowerCase().includes(searchTerm.toLowerCase())){
            return true;
        }
        if (post.html.toLowerCase().includes(searchTerm.toLowerCase())){
            return true;
        }
        if (post.tags.filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase())).length > 0){
            return true;
        }
        if (post.authors.filter(author => author.name.toLowerCase().includes(searchTerm.toLowerCase())).length > 0){
            return true;
        }
    });

    if (sortBy == "popularity:desc"){
        results = sortResults(results, searchTerm);
    }

    return {
        posts: results,
        total: results.length,
        searchTerm: searchTerm,
        sortBy: sortBy
    }
}

async function getLocalPosts(localeTag) {
    if (process.browser && localStorage && localStorage.localPosts){
        let localPosts = JSON.parse(localStorage.localPosts);
        if (localeTag != localPosts.localeTag || moment().diff(moment(localPosts.lastUpdated), "hours", true) > 3){
            let posts = await getPosts({
                limit: "all",
                filter: `tag:${localeTag}`,
                include: "tags,authors",
            });
            localStorage.localPosts = JSON.stringify({
                posts,
                lastUpdated: moment(),
                localeTag
            })
            return posts;
        }
        else {
            return localPosts.posts;
        }
    }
    else {
        let posts = await getPosts({
            limit: "all",
            filter: `tag:${localeTag}`,
            include: "tags,authors",
        });
        if (process.browser && localStorage){
            localStorage.localPosts = JSON.stringify({
                posts,
                lastUpdated: moment(),
                localeTag
            });
        }
        return posts;
    }
}

function sortResults(results, searchTerm) {

    // Primary results are shown first, based off title and tag content
    let primaryResults = results.filter(post => {
        if (post.title.toLowerCase().includes(searchTerm.toLowerCase())){
            return true;
        }
        if (post.primary_tag.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return true;
        }
    });

    // Creating a new property with the title and tag merged for ease of use in the customSort function
    primaryResults.forEach(post => {
        post.titleTag = `${post.title} ${post.primary_tag.name}`;
    });

    primaryResults = customSort(primaryResults, searchTerm, "titleTag");

    let secondaryResults = results.filter(n => !primaryResults.includes(n));

    secondaryResults = customSort(secondaryResults, searchTerm, "html");

    return primaryResults.concat(secondaryResults);
}

function customSort(results, searchTerm, property) {
    let regex = new RegExp(searchTerm.toLowerCase(), "g");
    results = results.sort((a, b) => {
        if ((a[property].toLowerCase().match(regex) || []).length > (b[property].toLowerCase().match(regex) || []).length){
            return -1;
        }
        if ((a[property].toLowerCase().match(regex) || []).length < (b[property].toLowerCase().match(regex) || []).length){
            return 1;
        }
        return 0;
    });
    return results;
}