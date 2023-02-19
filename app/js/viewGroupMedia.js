import {getValuesFieldText} from "./utils/tools_form.js";
import  '../../lib/sortable/sortable.min.js';
import { PATH } from "../configUrl.js";

const storeDraw = {
    drawOfComics: []
}
const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

const gridjs = new window.gridjs.Grid()

function initView() {
    console.log('initView comics')
    document.getElementById('main').innerHTML = `<div id="viewComics"></div>`
    document.getElementById('viewComics').innerHTML = templateTabs()

    // get storeDraw
    let draws = document.querySelector('.cls-store-data').dataset.storeDrawOfComics
    storeDraw.drawOfComics = JSON.parse(draws)
    // console.log(storeDraw)


    // tabs
    const bsTab = new bootstrap.Tab('#myTab')
    const tabEl = document.querySelectorAll('button[data-bs-toggle="tab"]')
    tabEl.forEach(elt => {
        elt.addEventListener('shown.bs.tab', event => {
            event.target // newly activated tab
            event.relatedTarget // previous active tab
            console.log(event.target)

            let idTarget = event.target.dataset.bsTarget
 
            switch (idTarget) {
                case '#add-comics':
                    document.querySelector(idTarget).innerHTML = templateFormAddComicsHTML()
                    document.querySelector('.btnAddComics').addEventListener("click", addComics)
                    break;
                case '#edit-comics':
                    document.querySelector(idTarget).innerHTML = templateContentTabsEditDrawOfComicsHTML()
                    // initSortableDraws()
                    break;
                case '#get-comics':
                    document.querySelector(idTarget).innerHTML = templateContentTabsComicsCollection()
                    getComicsCollection()

                    break;
                default:
                    break;
            }
        })
    
    })
}

function templateTabs() {

    let html = `
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link " id="add-comics-tab" data-bs-toggle="tab" data-bs-target="#add-comics" type="button" role="tab" aria-controls="add-comics" aria-selected="true">Ajouter une bd</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="edit-comics-tab" data-bs-toggle="tab" data-bs-target="#edit-comics" type="button" role="tab" aria-controls="edit-comics" aria-selected="false">Editer une bd</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="get-comics-tab" data-bs-toggle="tab" data-bs-target="#get-comics" type="button" role="tab" aria-controls="get-comics" aria-selected="false">Tableau bd</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
      </li>
    </ul>
    
    <!-- Tab panes -->
    <div class="tab-content">
      <div class="tab-pane " id="add-comics" role="tabpanel" aria-labelledby="add-comics-tab" tabindex="0"></div>
      <div class="tab-pane" id="edit-comics" role="tabpanel" aria-labelledby="edit-comics-tab" tabindex="0"></div>
      <div class="tab-pane" id="get-comics" role="tabpanel" aria-labelledby="get-comics-tab" tabindex="0"></div>
      <div class="tab-pane" id="settings" role="tabpanel" aria-labelledby="settings-tab" tabindex="0">...</div>
    </div>
    
    `
    return html
}

function templateContentTabsComicsCollection() {
    let html = `
        <div class="template-comics-collection">

            <div id="d-collection"></div>
        </div>
        `
return html
}

/**
 * 
 */
function getComicsCollection() {

    const q = {
        controller: 'ComicsController',
        action: 'getComicsCollection',
    }
    
    gridjs.updateConfig({
        columns: ['id', 'reference', 'is_active'],
        search: true,
        pagination: {
            limit: 10
        },
        server: {
          url: PATH.urlApi+`?controller=${q.controller}&action=${q.action}`,
          then: data => data.data.map(item => [
            item.id, item.reference, item.is_active
          ]),
        } 
      }).render(document.getElementById("d-collection"));

}


/**
 * 
 */
function initSortableDraws() {
    // console.log('aaaaaaaaaaaaaaaa')

    document.querySelector('.editsDrawOfComics').innerHTML = `<div id="simpleList" class="d-flex" style="flex-wrap:wrap;">${getMedia()}</div>`

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
//



/**
 * 
 */
function templateContentTabsEditDrawOfComicsHTML() {
    // form fetch comics (ref or id)
    // form get draw by ref or name
    // sortable
    // save
    // save order of comics
    let html = `
        <div class="editsDrawOfComics">

            <div class="draw-for-comics"></div>

            <div class="border mt-3 p-2">
                <h5 class="h5">Gestion des images d'une bd</h5>
                <div class="row">
                <div class="col-4">
                        <div class="form-label">
                            <label>Reference de la bd</label>
                            <input type="text" data-field-type="text" data-field-name="comics-reference" name="comics-reference" class="form-control form-control-sm" />
                        </div>
                        <button class="btn btn-primary btn-sm btnAA">Recherche</button>
                    </div>
                    <div class="col-4">
                        <div class="form-label">
                            <label>Reference des dessin</label>
                            <input type="text" data-field-type="text" data-field-name="draw-reference" name="draw-reference" class="form-control form-control-sm" />
                        </div>
                        <button class="btn btn-primary btn-sm btnAA">Recherche</button>
                    </div>
                    <div class="col-4">
                        <div class="btn btn-primary btn-sm btnB">charger une serie de dessin depuis le store</div>
                    </div>
                </div>
            </div>

            <div class="border mt-3 p-2">
                <h5 class="h5">Gestion des images d'une bd</h5>
                <div class="row">
                    <div class="col-4">
                        <span class="fs-5">liste dessin de la bd</span>
                        <div>
                            
                        </div>
                    </div>
                    <div class="col-4">
                        <span class="fs-5">liste draws selectionner</span>
                        <div>
                            
                        </div>
                    </div>
                    <div class="col-4">
                        <span class="fs-5">liste store</span>
                        <div>
                            
                        </div>
                    </div>
                </div>
                <div>
                    <button class="btn btn-primary btn-sm btnAA">Fusioner les liste</button>
                </div>
                <div>
                    <button class="btn btn-primary btn-sm btnAA">Voir les dessin</button>
                </div>
            </div>

            <div class="border mt-3 p-2">
                <h5 class="h5">Order la liste</h5>
                <div class="">

                </div>
                <div>
                    <button class="btn btn-primary btn-sm btnAA">Enregistrer</button>
                </div>
            </div>



            <button>cliquer</button>
        </div>
        `
    return html
}

/**
 * 
 * @returns 
 */
function templateFormAddComicsHTML() {

    let html = `
        <div class="formAddComics">
            <h5>Ajouter d'une bd</h5>
            <div class="form-label">
                <label>Reference</label>
                <input type="text" data-field-type="text" data-field-name="comics-reference" name="comics-reference" class="form-control form-control-sm" />
            </div>
            <div>
                <label class="form-label">Titre</label>
                <input type="text" data-field-type="text" data-field-name="comics-title" name="comics-title" class="form-control form-control-sm" />
            </div>
            <div>
                <label class="form-label">description</label>
                <textarea type="text" data-field-type="text" data-field-name="comics-desc" name="comics-desc"  class="form-control form-control-sm" aria-label="With textarea"></textarea>
            </div>
            <div>
                <label class="form-label">Icone image bd</label>
                <input type="text" data-field-type="text" data-field-name="comics-icone" name="comics-icone" class="form-control form-control-sm" />
            </div>
            <div>
                <button class="btn btn-primary btn-sm btnAddComics">Ajouter</textarea>
            </div>
        </div>
        `
    return html
}

/**
 * 
 * @returns 
 */
async function addComics() {

    let textValue = getValuesFieldText({
        format: 'objectOfValue',
        wrapper: '.formAddComics',
        field: '[data-field-type="text"]',
    });
    
    let formatInformationJson = {
        title: textValue['comics-title'],
        desc: textValue['comics-desc'],
        icone: textValue['comics-icone'],
    }

    let data = {
        reference: textValue['comics-reference'],
        information: JSON.stringify(formatInformationJson)
    };
    data = JSON.stringify(data)

    let formData = new FormData();
    formData.append("controller", "ComicsController");
    formData.append("action", "addComics");
    formData.append("params", data);
    
    const req = await fetch(PATH.urlApi ,{
        method: 'POST',
        headers: {
            "Accept": "application/json",
        },
        body: formData
    })
        
    if (req.ok === true) {
        return req.json()
    } else {
        throw new Error('nouvelle erreur lors de la creation')
    }
 
}

export {  initView };