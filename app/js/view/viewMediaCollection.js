import { PATH } from "../../configUrl.js";
import { ComponentDialog } from "../components/ComponentDialog.js";
import { ComponentDrawer } from "../components/ComponentDrawer.js";
const gridjs = new window.gridjs.Grid()

const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'small'
}

const storeDraw = {
    drawList: [],
    drawId: 0,
    drawItem: {},
    drawOfComics: []
}

function initView() {
    document.getElementById('main').innerHTML = `
        <div id="viewMediaCollection"><div class="act-modal">modal</div>
            ${template.title}
            ${template.collection}
        </div>
        `
    
    viewMediaCollection()
    document.querySelector('.act-modal').addEventListener('click', () => {
        // let dialog = ComponentDialog({
        //     title: '<div>title</div>',
        //     content: 'contenu',
        //     action: '<div>button</div>',
        //     width: 800,
        //     height: 500
        // })
        // dialog.method.open()
        // drawer.method.open()
    })
    
    // drawer
}

function viewMediaCollection() {
    const drawer = ComponentDrawer({
        target: '#main',
        hideWhenIsClosed: true,
    })
    drawer.method.render()

    const ui = {
        uiDrawer: drawer.ui.drawerUiid,
        tableMediaCollection: '.table-media-collection',
        fieldRef: '.formEditMedia [name="reference"]',
        fieldTitle: '.formEditMedia [name="title"]',
        updateMedia: '.updateMedia',
        formEditMedia: '.formEditMedia'
    };

    const method = {
        createTable: () => {

            const q = {
                controller: 'MediaController',
                action: 'getMediaCollection',
            }
        
            gridjs.updateConfig({
                columns: [
                    "id",
                    "original_name",
                    "name",
                    "reference",
                    { 
                        name: 'image',
                        data: null,
                        formatter: (_, row) => window.gridjs.html(`
                            <img src="${ressource.pathUpload+'small/'+(row.cells[2].data)}" 
                                alt="img" style="width:32px;max-width:100%;height:auto;" />`)
                    },
                    { 
                        name: 'Edit',
                        formatter: (cell, row) => {
                            return window.gridjs.h('button', {
                                className: 'py-2 px-4 border rounded-md text-white bg-blue-600',
                                onClick: () => {
                                    let item = {
                                        id: row.cells[0].data,
                                        name: row.cells[1].data
                                    }
                                    method.editMedia(item)
                                }
                            }, 'éditer');
                        }
                    },
                    { 
                        name: 'Supprimer',
                        formatter: (cell, row) => {
                            return window.gridjs.h('button', {
                                className: 'py-2 px-4 border rounded-md text-white bg-blue-600',
                                onClick: () => {
                                    let item = {
                                        id: row.cells[0].data,
                                        name: row.cells[1].data
                                    }
                                    if (window.confirm("Voulez supprimer cette image ?")) {
                                        method.deleteMedia(item)
                                    }
                                }
                            }, 'Supprimer');
                        }
                    },
                ],
                sort: true,
                // search: true,
                search: {
                    server: {
                        url: (prev, keyword) => `${prev}search=${keyword}`
                        // url: (prev, page, limit, keyword) => `${prev}?controller=${q.controller}&action=${q.action}&search=${keyword}&limit=${limit}&offset=${page * limit}`
                    }

                  },
                server: {
                    url: PATH.urlApi,
                    then: data => data.data.map(item => [
                    item.id, item.original_name, item.name, item.reference
                    ]),
                    total: data => data.count
                },
                pagination: {
                    limit: 10,
                    server: {
                    url: (prev, page, limit) => `${prev}?controller=${q.controller}&action=${q.action}&limit=${limit}&offset=${page * limit}`
                    }
                },
                language: {
                    search: {
                    placeholder: "Recherche...",
                    },
                    pagination: {
                    previous: "précédent",
                    next: "suivant",
                    showing: "Affiche",
                    to: "à",
                    of: " - total",
                    results: () => "enregistrement(s)",
                    },
                },
            }).render(document.querySelector(ui.tableMediaCollection));
        },
        deleteMedia: (item) => {
            let params = {
                id: item.id,
                name: item.name
            }
            method.fetchDelete(PATH.urlApi, params).then((json) => {

                storeDraw.drawList = storeDraw.drawList.filter(elt =>  elt.id != item.id )
        
                gridjs.updateConfig({
                    data: storeDraw.drawList
                }).forceRender();
          
            })
        },
        editMedia: async (item) => {
            let params = {
                ids: [item.id]
            }
            
            let result = await method.fetchMedias(PATH.urlApi, params)

            if (result.success) {
                drawer.method.open()
                drawer.state.content = template.formEditMedia
                drawer.method.refreshContent()
                let media = result.data[0]
                document.querySelector(ui.fieldRef).value = media.reference
                document.querySelector(ui.fieldTitle).value = media.title
                document.querySelector(ui.updateMedia).addEventListener('click', () => {
                    method.updateMedia(item)
                })

            } else {
                console.error('error get media')
            }

        },
        updateMedia: async (item) => {
            let params = {
                id: item.id,
                reference: document.querySelector(ui.fieldRef).value,
                title: document.querySelector(ui.fieldTitle).value,
            }

            let result = await method.fetchUpdateMedia(PATH.urlApi, params)

            if (result.success) {
                document.querySelector(ui.formEditMedia).insertAdjacentHTML('beforeend', '<div class="mt-2">La modification a bien été effectuer</div>')
            } else {
                document.querySelector(ui.formEditMedia).insertAdjacentHTML('<div>Une erreur est survenue lors de la modification</div>')
            }

        },
        fetchUpdateMedia: async (url, params) => {
  
            let data = {
                "controller": "MediaController",
                "action": "updateMedia",
                "params":  JSON.stringify(params),
             }
             data = JSON.stringify(data)
         
             const req = await fetch(url ,{
                 method: 'POST',
                 headers: {
                     "Accept": "application/json",
                 },
                 body: data
             })
         
             if (req.ok === true) {
                 return req.json()
             }
             throw new Error('nouvelle erreur lors de la creation')
        },
        fetchMedias: async (url, params) => {

            // let params = {"ids":['98', '99']}
            let data = {
               "controller": "MediaController",
               "action": "getMedias",
               "params":  JSON.stringify(params),
            }
            data = JSON.stringify(data)
        
            const req = await fetch(url ,{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                },
                body: data
            })
        
            if (req.ok === true) {
                return req.json()
            }
            throw new Error('nouvelle erreur lors de la creation')
        },
        fetchDelete: async (url, item) => {

            let params = {"id": item.id, "name": item.name}

            let data = {
               "controller": "MediaController",
               "action": "deleteMedia",
               "params":  JSON.stringify(params),
            }
            data = JSON.stringify(data)
        
            const req = await fetch(url ,{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                },
                body: data
            })
            
            if (req.ok === true) {
                return req.json()
            }
            throw new Error('nouvelle erreur lors de la creation')
        }
    }

    const template = {
        formEditMedia: 
            `<div class="formEditMedia border mt-3 p-2">
                <div class="row">
                    <div class="col-12">
                        <h5>Modification du media</h5>
                        <div class="form-label">
                            <label>Reference</label> 
                            <input type="text" data-field-type="text" data-field-name="reference" name="reference" class="form-control form-control-sm" />
                        </div>
                        <div>
                            <label class="form-label">Titre</label>
                            <input type="text" data-field-type="text" data-field-name="title" name="title" class="form-control form-control-sm" />
                        </div>
                        
                        <button class="btn btn-primary btn-sm updateMedia mt-3">Sauvegarder</button>
                    </div>
                </div>
            </div>`
    }


    method.createTable()
}



const template = {
    title: `<div>view media collection</div>`,
    collection: `<div class="table-media-collection"></div>`
}


export {  initView };