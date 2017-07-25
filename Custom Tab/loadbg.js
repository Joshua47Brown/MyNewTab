var bg;
var pn;
chrome.storage.sync.get("background", function(b) {
    bg = b.background;
    pn = b.background;
    if (bg == null) { bg = 1; }
    if (pn == null) { pn = 1; }
    switch (bg) {
        case 1:
            document.body.style.backgroundImage = "url(images/hue-mountains.jpeg)";
            break;
        case 2:
            document.body.style.backgroundImage = "url(images/mountains.jpeg)";
            break;
        case 3:
            document.body.style.backgroundImage = "url(images/shore.jpeg)";
            break;
        case 4:
            document.body.style.backgroundImage = "url(images/sky.jpeg)";
            break;
    }
});