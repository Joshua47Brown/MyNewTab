var page;
chrome.storage.sync.get('pageNum', function(p) {
    page = p.pageNum;
    if (page == null) { page = 1; }
    switch (p.pageNum) {
        case 1:
            //
            break;
        case 2:
            //
            break;
        case 3:
            //
            break;
    }
});