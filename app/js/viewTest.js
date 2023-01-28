import  './../../lib/sortable/sortable.min.js';
import { PATH } from "../configUrl.js";
const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

export function initView() {
    console.log('viewTest')


    document.getElementById('main').innerHTML = `<div id="sortable-test"></div>`
    a()
}

function a() {
    console.log('aaaaaaaaaaaaaaaa')

    document.getElementById('sortable-test').innerHTML = `<div id="simpleList" class="list-group" style="flex-wrap:wrap;">${getMedia()}</div>`

    var el = document.getElementById('simpleList');
    var sortable = Sortable.create(el, {
        direction: 'horizontal'
    })
    console.log(sortable)
}

function getMedia() {

    let mediaList = document.querySelector('.cls-store-data').dataset.storeDrawOfComics
    mediaList = JSON.parse(mediaList)
    console.log(mediaList)

    let html = ''

    mediaList.items.forEach(item => {
        html += `
            <div class="m-2 p-2 border" class="list-group-item" style="width:100px;">
                <img src="${ressource.pathUpload+'original/'+item.srcImg}" alt="">
            </div>
        `
    });

    return html

}