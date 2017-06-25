var bg;
chrome.storage.sync.get("background", function(b) {
    bg = b.background;
    pn = b.background;
    if (bg == null) { bg = 1; }
    switch (b.background) {
        case 1:
            document.body.style.backgroundImage = "url('sea-sunset.jpg')";
            break;
        case 2:
            document.body.style.backgroundImage = "url('forest-pool.jpg')";
            break;
        case 3:
            document.body.style.backgroundImage = "url('orange-mountains.jpg')";
            break;
        case 4:
            document.body.style.backgroundImage = "url('green-hills.jpeg')";
            break;
    }
});