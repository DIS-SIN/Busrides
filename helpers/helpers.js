export function getCleanSearchTerm(searchTerm) {
    searchTerm = searchTerm.replace(/[\:\;]/g, "");
    return searchTerm.replace(/\//g, " ");
}

export function getUserAgent(req) {
    return !process.browser ? req.headers["user-agent"] : window.navigator.userAgent;
}

export function htmlToPlainText(html) {
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
    html = html.replace(/<\/div>/ig, '\n');
    html = html.replace(/<\/li>/ig, '\n');
    html = html.replace(/<li>/ig, '  *  ');
    html = html.replace(/<\/ul>/ig, '\n');
    html = html.replace(/<\/p>/ig, '\n');
    html = html.replace(/<br\s*[\/]?>/gi, "\n");
    html = html.replace(/<[^>]+>/ig, '');
    return html;
}