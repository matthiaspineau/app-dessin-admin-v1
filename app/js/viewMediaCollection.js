import { PATH } from "../configUrl.js";


const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

function initView() {
    document.getElementById('main').innerHTML = `
        <div id="viewMediaCollection">
            ${template.title}
        </div>`

    viewMediaCollection()
}

function viewMediaCollection() {
    
    const ui = {
        // createGroup: document.querySelector('.btnAddGroupMedia'),
    };

    const method = {
        
    }

    // ui.createGroup.addEventListener("click", () => {
        
    // })
}



const template = {
    title: `<div>view media collection</div>`
}


export {  initView };