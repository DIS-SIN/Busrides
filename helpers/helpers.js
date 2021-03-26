export function getCleanSearchTerm(searchTerm) {
    searchTerm = searchTerm.replace(/[\:\;]/g, "");
    return searchTerm.replace(/\//g, " ");
}

export function getUserAgent(req) {
    return !process.browser ? req.headers["user-agent"] : window.navigator.userAgent;
}

export function getEggsFound(){
    if (process.browser && localStorage){
        if (localStorage.eggHunt){
            return JSON.parse(localStorage.eggHunt);
        }
    }
    return [];
}