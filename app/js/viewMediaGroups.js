import { fetchGetTableDraw, fetchDelete } from './fetch_data.js';
import {getValuesFieldText} from "./utils/tools_form.js";
import  './../../lib/sortable/sortable.min.js';
import { PATH } from "../configUrl.js";

const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

const gridjs = new window.gridjs.Grid()

const state = {
    medias_tmp_collection_table: [],
    medias_tmp_collection_group: [],
    medias_tmp_collection_fusionned: [],
    medias: []
}

export function initView() {

    document.getElementById('main').innerHTML = `<div id="viewMediaGroups"></div>`
    viewMediaGroups()
}


function viewMediaGroups() {

    document.getElementById('viewMediaGroups').innerHTML = `
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" id="tabsComponent" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link " id="add-group-tab" data-bs-toggle="tab" data-bs-target="#add-group" type="button" role="tab" aria-controls="add-groups" aria-selected="true">Ajouter un group</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="add-media-tab" data-bs-toggle="tab" data-bs-target="#add-media" type="button" role="tab" aria-controls="add-media" aria-selected="false">Ajouter des media</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="edit-order-tab" data-bs-toggle="tab" data-bs-target="#edit-order" type="button" role="tab" aria-controls="edit-order" aria-selected="false">Ordonné list media</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="get-groups" data-bs-toggle="tab" data-bs-target="#get-groups" type="button" role="tab" aria-controls="get-groups" aria-selected="false">Groupes collection</button>
        </li>
        </ul>
        
        <!-- Tab panes -->
        <div class="tab-content">
        <div class="tab-pane" id="add-group" role="tabpanel" aria-labelledby="add-group-tab" tabindex="0"></div>
        <div class="tab-pane" id="add-media" role="tabpanel" aria-labelledby="add-media-tab" tabindex="0"></div>
        <div class="tab-pane" id="edit-order" role="tabpanel" aria-labelledby="edit-order-tab" tabindex="0"></div>
        <div class="tab-pane" id="get-groups" role="tabpanel" aria-labelledby="get-groups-tab" tabindex="0">...</div>
        </div>`


    // tabs
    const bsTab = new bootstrap.Tab('#tabsComponent')
    const tabEl = document.querySelectorAll('button[data-bs-toggle="tab"]')
    tabEl.forEach(elt => {
        elt.addEventListener('shown.bs.tab', event => {
            event.target // newly activated tab
            event.relatedTarget // previous active tab
            // console.log(event.target)
    
            let idTarget = event.target.dataset.bsTarget
    
            switch (idTarget) {
                case '#add-group':
                    document.querySelector(idTarget).innerHTML = templateFormAddGroupsMediaHTML()
                    document.querySelector('.act-1').addEventListener('click', () => {
                        addGroupsMedia()
                    })

                    break;
                case '#add-media':
                    document.querySelector(idTarget).innerHTML = `<div>
                        <div id="">
                            <div class="row">
                                <div class="col-md-6">
                                    <div>nb media : <span class="nb-media">${state.medias.length}</span></div>
                                    <button class="btn btn-primary btn-sm act-2">rafraichir</button>
                                    <button class="btn btn-primary btn-sm act-viewListMedias">voir la liste</button>
                                </div> 
                            </div>
                        </div>
                        <div id="table-media-collection-gridjs"></div>
                    </div>`
                    createTableMediaCollection()
                    document.querySelector('.act-2').addEventListener('click', () => {
                        updateGroupsMedia()
                    })
                    
  
                    break;
                case '#edit-order':

    //             medias_tmp_collection_table: [],
    // medias_tmp_collection_group: [],
    // medias_tmp_collection_fusionned: [],
                    document.querySelector(idTarget).innerHTML = `<div id="edit-order-media">
                            <div class="row mt-2 mb-2">
                                <div class="col-3">${getIndicatorList()}</div>
                                <div class="col-3">${getIndicatorList()}</div>
                                <div class="col-3">${getIndicatorListFusionned()}</div>
                            </div>
                            <ul id="sortable-collection" class="card-sortable-media__container">${sortableListMedias()}</ul>
                            <div class="mt-3">
                                <button class="btn btn-primary btn-sm save-order">sauvegarder</button>
                            </div>
                            <div>${templateFormAddGroupsMediaAddMediasHTML()}</div>
                        </div>`       
                        
                        const el = document.getElementById('sortable-collection')
                        const sortable = Sortable.create(el, {
                            direction: 'horizontal'
                        });

                        document.querySelectorAll('.card-sortable-media__remove').forEach(item => {
                            item.addEventListener('click', () => {
                                let idRemove = item.dataset.idRemove
                                document.querySelector('.card-item[data-id="'+idRemove+'"]').remove()
                            })
                        })

                        document.querySelector('.save-order').addEventListener('click', () => {
                            console.log(sortable.toArray())
                            let sortOrder = sortable.toArray()
                            let medias = []
                            sortOrder.forEach(order => {
                                state.medias_tmp_collection_table.filter( media => {
                                    if (media.id == order) {
                                        let item = {
                                            id: media.id,
                                            src: media.src
                                        }

                                        medias.push(item)
                                    }
                                })
                            })

                            console.log(medias)
                            state.medias = medias
                        })

                        document.querySelector('.formMediaGroupsAddMedias .save-medias-group').addEventListener('click', () => {
                            addGroupsMediaListMedias()
                        })

                        // function templateFormAddGroupsMediaAddMediasHTML() {
    
                        //     let html = `<div class="formMediaGroupsAddMedias border mt-3 p-2">
                        //                     <h5 class="h5">Ajouter un group de media</h5>
                        //                     <div class="row">
                        //                         <div class="col-4">
                        //                             <div class="form-label">
                        //                                 <label>reference du group</label>
                        //                                 <input type="text" data-field-type="text" data-field-name="group-reference" name="group-reference" class="form-control form-control-sm" />
                        //                             </div>
                        //                             <button class="btn btn-primary btn-sm save-medias-group">Enregistrer</button>
                        //                         </div>
                        //                     </div>
                        //                 </div>
                        //                 `
                        //     return html
                        // }
                    
                    break;
                    case '#edit-order':
                        document.querySelector(idTarget).innerHTML = `<div>
                        <div id="table-groups-collection-gridjs"></div>
                    </div>`
                    // getTableCollectionsGroups()
                    // document.querySelector('.act-2').addEventListener('click', () => {
                    //     updateGroupsMedia()
                    // })
           
                        break;
                default:
                    break;
            }
        })
    
    })
}

function templateFormAddGroupsMediaHTML() {
    
    let html = `<div class="formMediaGroups border mt-3 p-2">
                    <h5 class="h5">Ajouter un group de media</h5>
                    <div class="row">
                        <div class="col-4">
                            <div class="form-label">
                                <label>id du group</label>
                                <input type="text" data-field-type="text" data-field-name="group-id" name="group-id" class="form-control form-control-sm" />
                            </div>
                            <button class="btn btn-primary btn-sm act-1">Ajouter</button>
                        </div>
                    </div>
                </div>
                `
    return html
}

function templateFormAddGroupsMediaAddMediasHTML() {
    
    let html = `<div class="formMediaGroupsAddMedias border mt-3 p-2">
                    <h5 class="h5">Ajouter un group de media</h5>
                    <div class="row">
                        <div class="col-4">
                            <div class="form-label">
                                <label>id du group</label>
                                <input type="text" data-field-type="text" data-field-name="group-id" name="group-id" class="form-control form-control-sm" />
                            </div>
                            <button class="btn btn-primary btn-sm save-medias-group">Enregistrer</button>
                        </div>
                    </div>
                </div>
                `
    return html
}

async function addGroupsMedia() {

    let textValue = getValuesFieldText({
        format: 'objectOfValue',
        wrapper: '.formMediaGroups',
        field: '[data-field-type="text"]',
    });
    
    let data = {
        reference: textValue['group-reference'],
    };
    data = JSON.stringify(data)

    let formData = new FormData();
    formData.append("controller", "MediaController");
    formData.append("action", "addGroupMedia");
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


/**
 * save list media in bdd
 */
async function addGroupsMediaListMedias() {

    let textValue = getValuesFieldText({
        format: 'objectOfValue',
        wrapper: '.formMediaGroupsAddMedias',
        field: '[data-field-type="text"]',
    });
    console.log(textValue)
    let data = {
        id: textValue['group-id'],
        medias: JSON.stringify({"medias": state.medias})
    };
    data = JSON.stringify(data)

    let formData = new FormData();
    formData.append("controller", "MediaController");
    formData.append("action", "updateMediasOfGroups");
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


/**
 * Edit order media
 */
function sortableListMedias() {

    let mediaHtml = ``

    state.medias_tmp_collection_table.forEach(media => {
        mediaHtml += `
        <li class="card-sortable-media__content card-item" data-id="${media.id}">
            <div class="card-sortable-media__remove" data-id-remove="${media.id}">retirer</div>
            <div class="card-sortable-media__img"><img src="${ressource.pathUpload}small/${media.src}" alt="media"></div>
            <div class="card-sortable-media__desc">id: ${media.id}</div>
        </li>
        `
    })

    
    return mediaHtml
    
}



/**
 * 
 */


/**
 * collection medias table
 */
function createTableMediaCollection() {
    fetchGetTableDraw(PATH.urlApi).then((json) => {

        if (json.data == undefined) {
            return
        }

        gridjs.updateConfig({
            columns: [
                'id',
                'drawing_name',
                'drawing_title',
                'id_drawing_category',
                { 
                  name: 'image',
                  data: null,
                    formatter: (_, row) => window.gridjs.html(`
                        <img src="${ressource.pathUpload+'small/'+(row.cells[1].data)}" 
                            alt="img" style="width:25px;max-width:100%;height:auto;" />`)
                },
                { 
                    name: 'store',
                    formatter: (cell, row) => {
                      return window.gridjs.h('button', {
                        className: 'py-2 px-4 border rounded-md text-white bg-blue-600',
                        onClick: () => {
                          let item = {
                            id: row.cells[0].data,
                            src: row.cells[1].data
                        }
                          state.medias_tmp_collection_table.push(item)
                          document.querySelector('.nb-media').innerHTML = state.medias_tmp_collection_table.length
                        }
                      }, 'Store');
                    }
                },
             ],
            data: json.data,
            sort: true,
            search: true,
            pagination: {
              limit: 10,
            },
            language: {
                'search': {
                  'placeholder': 'Recherche...'
                },
                'pagination': {
                  'previous': 'précédent',
                  'next': 'suivant',
                  'showing': 'Affiche',
                  'to': 'à',
                  'of': ' - total',
                  'results': () => 'enregistrement(s)'
                }
            }
          }).render(document.getElementById("table-media-collection-gridjs"));

        // gridjs.on('rowClick', (...args) => console.log('row: ' + JSON.stringify(args), args));
        // gridjs.on('cellClick', (...args) => console.log('cell: ' + JSON.stringify(args), args));
                
    })

    // console.log(gridjs)
}

async function updateGroupsMedia() {

    let textValue = getValuesFieldText({
        format: 'objectOfValue',
        wrapper: '.addMediaInGroups',
        field: '[data-field-type="text"]',
    });

    
    let data = {
        id: textValue['group-id'],
        mediaList: JSON.stringify(state.medias)
    };
    data = JSON.stringify(data)

    let formData = new FormData();
    formData.append("controller", "MediaController");
    formData.append("action", "updateGroupMedia");
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

function getIndicatorList(props) {

    let html = `
        <div class="border p-2 m-2">
            <div>nb element: non definie</div>
            <div>
                <button class="btn btn-primary btn-sm ">Effacer la list</button>
            </div>
        </div>
    `
    return html
}

function getIndicatorListFusionned(props) {
    let html = `
        <div class="border p-2 m-2">
            <div>nb element: non definie</div>
            <div>
                <button class="btn btn-primary btn-sm ">Effacer la list</button>
            </div>
        </div>
    `
    return html
}