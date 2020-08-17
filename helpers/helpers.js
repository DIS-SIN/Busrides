export function getCleanSearchTerm(searchTerm) {
    return searchTerm.replace(/\//g, " ");
}