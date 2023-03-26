import { PATH } from "../configUrl.js";

const gridjs = new window.gridjs.Grid()

const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'small'
}
// PATH.urlApi
const storeDraw = {
    drawList: [],
    drawId: 0,
    drawItem: {},
    drawOfComics: []
}

function initView() {
    document.getElementById('main').innerHTML = `
        <div id="viewMediaCollection">
            ${template.title}
            ${template.collection}
        </div>
        `

    viewMediaCollection()
    
}

function viewMediaCollection() {
    
    const ui = {
        // createGroup: document.querySelector('.btnAddGroupMedia'),
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
                    "name",
                    "reference",
                    { 
                        name: 'image',
                        data: null,
                        formatter: (_, row) => window.gridjs.html(`
                            <img src="${ressource.pathUpload+'small/'+(row.cells[1].data)}" 
                                alt="img" style="width:32px;max-width:100%;height:auto;" />`)
                    },
                    { 
                        name: 'Actions',
                        formatter: (cell, row) => {
                        return window.gridjs.h('button', {
                            className: 'py-2 px-4 border rounded-md text-white bg-blue-600',
                            onClick: () => {
                                let item = {
                                    id: row.cells[0].data,
                                    name: row.cells[1].data
                                }
                                method.deleteDraw(item)

                                }
                            }, 'Delete');
                        }
                    },
                ],
                sort: true,
                search: true,
                server: {
                    url: PATH.urlApi,
                    then: data => data.data.map(item => [
                    item.id, item.name, item.reference
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
            }).render(document.querySelector(".grid-collection"));
        },
        deleteDraw: (item) => {
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

    // ui.createGroup.addEventListener("click", () => {
        
    // })

    method.createTable()
}



const template = {
    title: `<div>view media collection</div>`,
    collection: `<div class="grid-collection"></div>`
}


export {  initView };