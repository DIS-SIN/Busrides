export function getCleanSearchTerm(searchTerm) {
    searchTerm = searchTerm.replace(/[\:\;]/g, "");
    return searchTerm.replace(/\//g, " ");
}