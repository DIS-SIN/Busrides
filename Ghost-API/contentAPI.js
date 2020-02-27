import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
    url: 'https://busrides-trajetsenbus.ca',
    key: 'ac6e3e888da0c5bda4e1ed9e60',
    version: "v2"
});

export async function getPosts(options) {
    return await api.posts
    .browse(options)
    .catch(err => {
        console.error(err);
    });
}

export async function getPost(slug) {
    return await api.posts
    .read({
        slug: slug,
        include: "tags,authors"
    })
    .catch(err => {
        console.error(err);
    });
}

export async function getAuthor(slug) {
    return await api.authors
    .read({
        slug: slug
    })
    .catch(err => {
        console.error(err);
    });
}

export async function getPages() {
    return await api.pages
    .browse()
    .catch(err => {
        console.error(err);
    });
}

export async function getPage(slug) {
    return await api.pages
    .read({
        slug: slug
    })
    .catch(err => {
        console.error(err);
    });
}

export async function getTags(tags) {
    return await api.tags
    .browse({
        order: 'slug ASC',
        filter: `slug:${tags}`
    })
    .catch(err => {
        console.error(err);
    });
}

export async function getTag(slug) {
    return await api.tags
    .read({
        slug: slug
    })
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