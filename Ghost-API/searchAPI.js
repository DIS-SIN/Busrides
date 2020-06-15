import fetch from 'isomorphic-unfetch';

export async function getSearchResults(searchTerm, localeTag, from = 0, sortBy = "popularity:desc"){
    let data = await fetch(`https://busrides-trajetsenbus.ca/search?q=${encodeURI(searchTerm)}+AND+tags.tag=${encodeURI(localeTag)}&from=${from}&sort=${sortBy}`);
    data = await data.json();
    data.searchTerm = searchTerm;
    data.sortBy = sortBy;
    return formatData(data);
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