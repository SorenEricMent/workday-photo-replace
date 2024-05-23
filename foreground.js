const repUrl = "https://yuuta.moe/yuuta.jpg";

function replaceImages() {
    [...[...[...Array.from(document.querySelectorAll('img[alt]'))].filter(x => {
        return x.alt.toLowerCase().indexOf("employee") != -1
            && x.alt.toLowerCase().indexOf("photo") != -1
    })], document.getElementsByClassName("wdappchrome-aax")[0]].forEach(y => {
        if (y.src.indexOf("attachment") != -1) {
            // Image covered by src attr
            y.src = repUrl;
        } else if (y.style["background-image"].indexOf("attachment") != -1) {
            y.setAttribute("style", "background-image: url(" + repUrl + ");"); // Workday's dev is an idiot who writes style in element
        } else {
            console.log(y);
        }
    });
}

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

replaceImages();
