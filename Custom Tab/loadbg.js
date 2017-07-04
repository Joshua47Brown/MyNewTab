var bg;
var pn;
chrome.storage.sync.get("background", function(b) {
    bg = b.background;
    pn = b.background;
    if (bg == null) { bg = 1; }
    if (pn == null) { pn = 1; }
    switch (b.background) {
        case 1:
            document.body.style.backgroundImage = "url(images/red-bridge.jpg)";
            break;
        case 2:
            document.body.style.backgroundImage = "url(images/green-hills.jpeg)";
            break;
        case 3:
            document.body.style.backgroundImage = "url(images/blue-lake.jpeg)";
            break;
    }
});