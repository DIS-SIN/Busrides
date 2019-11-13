const translateMe = {

    main: function() {
        let langIsEnglish = translateMe.getPageLang() == "en" ? true : false;
        translateMe.translate(langIsEnglish ? translateMe.en : translateMe.fr);
        translateMe.limitText();
        translateMe.translateLogo(translateMe.getPageLang());
        translateMe.translateProps(langIsEnglish ? translateMe.en : translateMe.fr);
        translateMe.translateDates(langIsEnglish ? "en-ca" : "fr-ca");
        translateMe.translateReadTime(langIsEnglish ? translateMe.en : translateMe.fr);
        translateMe.switchLangLink(window.location.pathname)
        translateMe.hideNavItems(translateMe.getPageLang());
        translateMe.hideTags(translateMe.getPageLang());
        translateMe.translateTwitter(langIsEnglish ? "DigiAcademyCAN" : "AcademieNumCAN");
    },

    getPageLang: function() {
        const PATH = window.location.pathname;

        if (PATH.includes("/tag/")){
            console.log("woo");
            return PATH.includes("/fr-") ? "fr" : "en";
        }

        return PATH.includes("/fr/") ? "fr" : "en";
    },

    translate: function(lang){

        [].forEach.call(document.querySelectorAll(".translateMe"), el => {
            el.innerText = lang[el.textContent];
            el.classList.add("translateMe_done");
        });
    },

    translateProps: function(lang){
        [].forEach.call(document.querySelectorAll("[data-translateMeProp]"), el => {

            let propToChange = el.getAttribute("data-translateMeProp");

            if (propToChange[0] == "["){
                propToChange = JSON.parse(propToChange);
                console.log(propToChange);
            }
            else {
                let text = el.getAttribute(propToChange);

                el.setAttribute(propToChange, lang[text]);

                el.classList.add("translateMe_done");
            }

        });
    },

    translateDates: function(lang){
        moment.locale(lang);

        [].forEach.call(document.querySelectorAll(".translateMe_date"), el => {
            el.innerText = moment(el.textContent, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow();
            el.classList.add("translateMe_done");
        });
    },

    translateReadTime: function(lang) {
        [].forEach.call(document.querySelectorAll(".translateMe_readTime"), readTime => {
            
            let time = Number(readTime.innerText.replace(/[^0-9]/g,''));

            readTime.innerText = lang["% min read"].replace("%", time);
            readTime.classList.add("translateMe_done");
        });
    },

    switchLangLink: function(path){
        // French Episode Page
        if (path.match(/\/fr\/.+/g)){
            let episode = path.split("fr/");
            if (episode.length >= 2){
                let second_path = episode[1];
                //check if the route is a paginated route
                if (second_path.match(/page(\/[0-9]+(\/)?)?/)){
                    episode = "/";
                }
                else{
                    episode = episode.join("en/");
                }
            }
            else {
                episode = episode.join("en/");
            }
            document.getElementById("nav-english").children[0].href = episode;
        }
        // English Episode Page
        else if (path.match(/\/en\/.+/g)){
            let episode = path.split("en/")
            if (episode.length >= 2){
                let second_path = episode[1];
                if (second_path.match(/page(\/[0-9]+(\/)?)?/)){
                    episode = "/fr";
                }
                else{
                    episode = episode.join("fr/");
                }
            }
            else{
                episode = episode.join("fr/");
            }
            document.getElementById("nav-francais").children[0].href = episode;
        }
    },

    hideNavItems: function(lang) {
        [].forEach.call(document.querySelectorAll(".translateMe_navLogo"), logo => {
            if (lang == "fr"){
                logo.href = "/fr/";
            }
            else {
                logo.href = "/";
            }
        });

        [].forEach.call(document.querySelectorAll(".translateMe_navItem"), navItem => {

            let link = navItem.children[0];

            if (lang == "fr"){
                if (link.textContent.toLowerCase() == "français" || !link.href.includes("/fr/") && !link.href.includes("/fr-") && link.textContent.toLowerCase() != "english"){
                    navItem.classList.add("translateMe_hideNavItem");
                }
            }
            else {
                if (link.textContent.toLowerCase() == "english" || link.href.includes("/fr-") || link.textContent.toLowerCase() != "français" && link.href.includes("/fr/")){
                    navItem.classList.add("translateMe_hideNavItem");
                }
            }

        });
    },

    hideTags: function(lang) {
        let count = 0;
        [].forEach.call(document.querySelectorAll(".translateMe_tag"), el => {
            // add 1 and if the item is removed remove the count
            // this way we only need one loop
            count += 1;
            if (!el.children[0].href.includes(`/${lang}-`)){
                el.remove();
                count -= 1;
            }
            if ( count > 10 ){
                el.remove();
            }
        });
    },

    translateTwitter: function(handle) {
        [].forEach.call(document.querySelectorAll(".translateMe_twitter"), el => {
            el.href = "https://twitter.com/" + handle;
        });
    },

    translateLogo: function(lang) {
        [].forEach.call(document.querySelectorAll(".translateMe_logo"), el => {
            el.src = `/content/images/logos/BusRidesPublicationLogo-${lang}.png`;
            el.classList.add("translateMe_done");
        });
    },

    limitText: function(){
        const MAX_LENGTH = 80;
        [].forEach.call(document.querySelectorAll("[data-translateMe_limitText]"), el => {
            let text = el.innerText;

            if (text.length > MAX_LENGTH){
                el.innerText = text.substr(0, MAX_LENGTH) + "...";
            }
        })
    },

    en: {
        "Page": "Page",
        "of": "of",
        "Published with": "Published with",
        "Subscribe": "Subscribe",
        "Subscribe to": "Subscribe to",
        "Subscribed!": "Subscribed!",
        "Subscribe to our newsletter": "Subscribe to our newsletter",
        "You've successfully subscribed to": "You've successfully subscribed to",
        "Your email address": "Your email address",
        "with the email address": "with the email address",
        "Email cannot be blank.": "Email cannot be blank.",
        "Get the latest posts delivered right to your inbox.": "Get the latest posts delivered right to your inbox.",
        "Stay up to date! Get all the latest & greatest posts delivered straight to your inbox.": "Stay up to date! Get all the latest & greatest posts delivered straight to your inbox.",
        "Recommended for you": "Recommended for you",
        "Featured": "Featured",
        "Page not found": "Page not found",
        "Unfortunately the page you were looking for could not be found.": "Unfortunately the page you were looking for could not be found.",
        "Back to home": "Back to home",
        "Go to the home page": "Go to the home page",
        "Recent articles": "Recent articles",
        "No recent articles found :(": "No recent articles found :(",
        "1 min read": "1 min read", 
        "% min read": "% min read",
        "No posts": "No posts",
        "No posts found": "No posts found",
        "Apparently there are no posts at the moment, check again later.": "Apparently there are no posts at the moment, check again later.",
        "1 post": "One post",
        "% posts": "% posts",
        "Tags": "Tags",
        "Topics": "Topics",
        "with this tag": "with this tag",
        "No tags found :(": "No tags found :(",
        "Posted by": "Posted by",
        "Among with": "<br>Among with ",
        "Among with no break line": "Among with ",
        "Type to search": "Type to search",
        "No results for your search, try something different.": "No results for your search, try something different.",
        "JavaScript license information": "JavaScript license information",
        "Read, Watch, Listen.": "Read, Watch, Listen.",
        "Bite sized learning about digital technology and government": "Bite sized learning about digital technology and government",
        "What is the Digital Academy?": "What is the Digital Academy?",
        "Subscribe to our newsletter": "Subscribe to our newsletter",
        "http://eepurl.com/gdiUTH": "http://eepurl.com/gdiUTH",
        "https://csps-efpc.gc.ca/About_us/Business_lines/digitalacademy-eng.aspx": "https://csps-efpc.gc.ca/About_us/Business_lines/digitalacademy-eng.aspx",
        "Busrides is in the beta phase of development. Regular site updates are made to enhance your experience!": "Busrides is in the beta phase of development. Regular site updates are made to enhance your experience!",
        "mailto:csps.digitalacademy-academiedunumerique.efpc@canada.ca?Subject=Busrides%20Feedback": "mailto:csps.digitalacademy-academiedunumerique.efpc@canada.ca?Subject=Busrides%20Feedback",
        "Provide feedback": "Provide feedback"
    },

    fr: {
        "Page": "Page",
        "of": "de",
        "Published with": "Publié avec",
        "Subscribe": "S'abonner",
        "Subscribe to": "S'abonnez à",
        "Subscribed!": "Inscrit !",
        "Subscribe to our newsletter": "S'abonner à notre newsletter",
        "You've successfully subscribed to": "Vous êtes inscrit avec succès à",
        "Your email address": "Votre adresse email",
        "with the email address": "avec l'adresse email",
        "Email cannot be blank.": "L'email ne peut pas être vide.",
        "Get the latest posts delivered right to your inbox.": "Recevez les derniers articles directement dans votre boite mail.",
        "Stay up to date! Get all the latest & greatest posts delivered straight to your inbox.": "Restez à jour ! Recevez tous les derniers et meilleurs articles directement dans votre boite mail.",
        "Recommended for you": "Recommandé pour vous",
        "Featured": "Mis en avant",
        "Page not found": "Page non trouvée",
        "Unfortunately the page you were looking for could not be found.": "Malheureusement la page que vous cherchez n'a pas pu être trouvée.",
        "Back to home": "Retour à l'accueil",
        "Go to the home page": "Aller à la page d'accueil",
        "Recent articles": "Articles Récents",
        "No recent articles found :(": "Aucun article récent trouvé :(",
        "1 min read": "Lecture d'1 min",
        "% min read": "Lecture de % min",
        "No posts": "Aucun article",
        "No posts found": "Aucun article trouvé",
        "Apparently there are no posts at the moment, check again later.": "Apparemment il n'y a pas d'article pour le moment, vérifiez plus tard.",
        "1 post": "Un article",
        "% posts": "% articles",
        "Tags": "Mots clés",
        "Topics": "Sujets",
        "with this tag": "avec ce mot clé",
        "No tags found :(": "Aucun mot clé trouvé :(",
        "Posted by": "Publié par",
        "Among with": "<br>Avec ",
        "Among with no break line": "Avec ",
        "Type to search": "Écrivez pour rechercher",
        "No results for your search, try something different.": "Pas de résultat pour votre recherche, essayez autre chose.",
        "JavaScript license information": "Informations sur la licence JavaScript",
        "Read, Watch, Listen.": "Lisez, regardez, écoutez.",
        "Bite sized learning about digital technology and government": "Micro apprentissage sur la technologie et le gouvernement numérique",
        "What is the Digital Academy?": "Qu'est-ce que l'Académie numérique?",
        "Subscribe to our newsletter": "Abonnez-vous à notre infolettre",
        "http://eepurl.com/gdiUTH": "http://eepurl.com/gdiUTz",
        "https://csps-efpc.gc.ca/About_us/Business_lines/digitalacademy-eng.aspx": "https://csps-efpc.gc.ca/About_us/Business_lines/digitalacademy-fra.aspx",
        "Busrides is in the beta phase of development. Regular site updates are made to enhance your experience!": "Trajet en bus est en phase de développement bêta. Des mises à jour régulières sont faites pour améliorer votre expérience!",
        "mailto:csps.digitalacademy-academiedunumerique.efpc@canada.ca?Subject=Busrides%20Feedback": "mailto:csps.digitalacademy-academiedunumerique.efpc@canada.ca?Subject=Busrides%20Rétroaction",
        "Provide feedback": "Fournir de la rétroaction"
    }  

};

document.addEventListener("DOMContentLoaded", translateMe.main);