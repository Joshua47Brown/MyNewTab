var page;
chrome.storage.sync.get('pageNum', function(p) {
    page = p.pageNum;
    if (page == null) { page = 1; }
    switch (p.pageNum) {
        case 1:
            ChangeCSS("theme-one.css", 0);
            break;
        case 2:
            ChangeCSS("theme-two.css", 0);
            break;
        case 3:
            ChangeCSS("theme-three.css", 0);
            break;
    }
});

function ChangeCSS(cssFile, cssLinkIndex) {
    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);
    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
