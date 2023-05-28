import { PATH } from "../../configUrl.js";

const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

function initView() {
    document.getElementById('main').innerHTML = `<div id="viewMediaGridCollection">
            ${template.title}
            ${template.collection}
        </div>`

    viewMediaGridCollection()
}

function viewMediaGridCollection() {
    
    const ui = {
        
    };

    const method = {
        fileChange: () => {
          
        },
    }





}


const template = {
    title: `<div>view media grid collection</div>`,
    collection: `<div class="grid-media-collection"></div>`
}

export {  initView };