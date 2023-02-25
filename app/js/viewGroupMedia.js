import {getValuesFieldText} from "./utils/tools_form.js";
import  '../../lib/sortable/sortable.min.js';
import { PATH } from "../configUrl.js";


const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

const gridjs = new window.gridjs.Grid()

function initView() {
    document.getElementById('main').innerHTML = `<div id="viewComics">${templateTabs()}</div>`


    // tabs
    const bsTab = new bootstrap.Tab('#myTab')
    const tabEl = document.querySelectorAll('button[data-bs-toggle="tab"]')
    tabEl.forEach(elt => {
        elt.addEventListener('shown.bs.tab', event => {

            let idTarget = event.target.dataset.bsTarget
 
            switch (idTarget) {
                case '#add-group-media':
                    document.querySelector(idTarget).innerHTML = templateFormAddGroupHTML()
                    document.querySelector('.btnAddGroupMedia').addEventListener("click", () => {
                        addGroupMedia()
                    })
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
        <button class="nav-link " id="add-group-media-tab" data-bs-toggle="tab" data-bs-target="#add-group-media" type="button" role="tab" aria-controls="add-group-media" aria-selected="true">Ajouter une bd</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="get-group-media-tab" data-bs-toggle="tab" data-bs-target="#get-group-media" type="button" role="tab" aria-controls="get-group-media" aria-selected="false">Tableau bd</button>
      </li>
    </ul>
    
    <!-- Tab panes -->
    <div class="tab-content">
      <div class="tab-pane " id="add-group-media" role="tabpanel" aria-labelledby="add-group-media-tab" tabindex="0"></div>
      <div class="tab-pane" id="get-group-media" role="tabpanel" aria-labelledby="get-group-media-tab" tabindex="0"></div>
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
 * @returns 
 */
function templateFormAddGroupHTML() {

    let html = `
        <div class="formAddGroupMedia">
            <h5>Ajouter un goupe</h5>
            <div class="form-label">
                <label>Reference</label>
                <input type="text" data-field-type="text" data-field-name="group-reference" name="group-reference" class="form-control form-control-sm" />
            </div>
            <div>
                <label class="form-label">Titre</label>
                <input type="text" data-field-type="text" data-field-name="group-title" name="group-title" class="form-control form-control-sm" />
            </div>
            <div>
                <label class="form-label">description</label>
                <textarea type="text" data-field-type="text" data-field-name="group-desc" name="group-desc"  class="form-control form-control-sm" aria-label="With textarea"></textarea>
            </div>
            <div>
                <label class="form-label">Icone image bd</label>
                <input type="text" data-field-type="text" data-field-name="group-icone" name="group-icone" class="form-control form-control-sm" />
            </div>
            <div>
                <button class="btn btn-primary btn-sm btnAddGroupMedia">Ajouter</textarea>
            </div>
        </div>
        `
    return html
}

/**
 * 
 * @returns 
 */
async function addGroupMedia() {

    let textValue = getValuesFieldText({
        format: 'objectOfValue',
        wrapper: '.formAddGroupMedia',
        field: '[data-field-type="text"]',
    });
    
    let formatInformationJson = {
        title: textValue['group-title'],
        desc: textValue['group-desc'],
        icone: textValue['group-icone'],
    }

    let data = {
        reference: textValue['group-reference'],
        information: JSON.stringify(formatInformationJson)
    };
    data = JSON.stringify(data)

    let formData = new FormData();
    formData.append("controller", "MediaGroupsController");
    formData.append("action", "addMediaGroups");
    formData.append("params", data);
    console.log(formData)
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