const repUrl = "https://yuuta.moe/yuuta.jpg";

const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            replaceImages();
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
});

(replaceImages = () => {
    [...[...[...Array.from(document.querySelectorAll('img[alt]'))].filter(x => {
        return x.alt.toLowerCase().indexOf("employee") != -1
            && x.alt.toLowerCase().indexOf("photo") != -1 ||
            x?.parentElement?.parentElement?.parentElement?.tagName == "UL"
    })], document.getElementsByClassName("wdappchrome-aax")[0]].forEach(y => {
        // aax is dirty fix and will need to be replaced with more advanced parent-context checking
        if (y != undefined) {
            if (y?.src.indexOf("attachment") != -1) {
                // Image covered by src attr
                y.src = repUrl;
            } else if (y?.style["background-image"].indexOf("attachment") != -1) {
                // Workday's dev is an idiot who writes style in element
                if (y.getAttribute("role") == "presentation") {
                    y.src = repUrl;
                    console.log(y);
                } else {
                    y.setAttribute("style", "background-image: url(" + repUrl + ");");
                }
            }
        }
    });
})();