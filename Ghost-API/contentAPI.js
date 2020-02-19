import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
    url: 'https://busrides-trajetsenbus.ca',
    key: 'ac6e3e888da0c5bda4e1ed9e60',
    version: "v2"
});

export async function getPosts(locale) {
    const posts = await api.posts
    .browse({
        limit: "all",
        include: "tags,authors"
    })
    .catch(err => {
        console.error(err);
    });
    return posts.filter(post => post.slug.substr(post.slug.length - 3) === `-${locale}`);
}

export async function getPages() {
    return await api.pages
    .browse()
    .catch(err => {
        console.error(err);
    });
}

export async function getTags() {
    return await api.tags
    .browse({order: 'slug ASC'})
    .catch(err => {
        console.error(err);
    });
}

export async function getSettings() {
    return await api.settings
    .browse()
    .catch(err => {
        console.error(err);
    });
}