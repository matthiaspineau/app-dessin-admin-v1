import {getValuesFieldText} from "./utils/tools_form.js";
import { PATH } from "../configUrl.js";


export function viewFormComics() {
    createFormAddComics()
}

function initView() {
    console.log('initView comics')
    document.getElementById('main').innerHTML = `<div id="viewComics"></div>`
    document.getElementById('viewComics').innerHTML = templateTabs()

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
                    document.querySelector(idTarget).innerHTML = 'aaaaaaaaaaaa'
                    break;
                case '#get-comics':
                    document.querySelector(idTarget).innerHTML = 'bbbbbbbbbbb'
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