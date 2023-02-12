import {getValuesFieldText} from "./utils/tools_form.js";
import  './../../lib/sortable/sortable.min.js';
import { PATH } from "../configUrl.js";

const gridjs = new window.gridjs.Grid()
const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

const state = {
    mediasTmpA: [],
    mediasTmpB: [],
    medias: []
}

export function initView() {

    document.getElementById('main').innerHTML = `<div id="viewMedias">${template()}</div>`
}

function template() {
    let html = `
    <div>
        <a class="btn btn-primary btn-sm" 
        data-bs-toggle="collapse" href="#collapseExample" role="button" 
        aria-expanded="false" aria-controls="collapseExample">
            ouvrir
        </a>
        <button class="btn btn-primary btn-sm" 
        type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" 
        aria-expanded="false" aria-controls="collapseExample">
        Button with data-bs-target
        </button>
    </div>
    <div class="collapse" id="collapseExample">
        <div class="p-2">
            aa
        </div>
    </div>
    `

    return html
}



