import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
    url: 'https://busrides-trajetsenbus.ca',
    key: 'ac6e3e888da0c5bda4e1ed9e60',
    version: "v2"
});

export async function getPosts() {
    return await api.posts
    .browse({
        limit: "all"
    })
    .catch(err => {
        console.error(err);
    });
}