// -------------------------------------------
function cleanDockMain() {
    console.log(document.querySelector("[data-dock-main-id='dock-main']"))
    document.querySelector("[data-dock-main-id='dock-main']").innerHTML = ""
}

function createDockMain(template) {
    cleanDockMain()
    document.querySelector("[data-dock-main-id='dock-main']").innerHTML = template
}

// -------------------------------------------



