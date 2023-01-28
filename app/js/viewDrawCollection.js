import { fetchGetTableDraw, fetchDelete } from './fetch_data.js';
import { PATH } from "../configUrl.js";

export function initView() {
    let viewTemplate = '<div id="table-get-draw-gridjs"></div>'
    document.getElementById('main').innerHTML = viewTemplate
    
    createTableDraw()
}
const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

const storeDraw = {
    drawList: [],
    drawId: 0,
    drawItem: {},
    drawOfComics: []
}
const gridjs = new window.gridjs.Grid()

function createTableDraw() {
    fetchGetTableDraw(PATH.urlApi).then((json) => {
        storeDraw.drawList = []
        storeDraw.drawId = 0,
        storeDraw.drawItem = {}
        storeDraw.drawList = json.data

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
                            deleteDraw(item)

                        }
                      }, 'Delete');
                    }
                  },
                  { 
                    name: 'store',
                    formatter: (cell, row) => {
                      return window.gridjs.h('button', {
                        className: 'py-2 px-4 border rounded-md text-white bg-blue-600',
                        onClick: () => {
                          let item = {
                              id: row.cells[0].data,
                              srcImg: row.cells[1].data
                        }

                          let draws = document.querySelector('.cls-store-data').dataset.storeDrawOfComics
                          draws = JSON.parse(draws)
                          draws.items.push(item)
                          document.querySelector('.cls-store-data').dataset.storeDrawOfComics = JSON.stringify(draws)
                        }
                      }, 'Store');
                    }
                  },
             ],
            data: json.data,
            sort: true,
            search: true,
            pagination: {
              limit: 3,
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
          }).render(document.getElementById("table-get-draw-gridjs"));

        // gridjs.on('rowClick', (...args) => console.log('row: ' + JSON.stringify(args), args));
        // gridjs.on('cellClick', (...args) => console.log('cell: ' + JSON.stringify(args), args));
                
    })

    // console.log(gridjs)
}

function deleteDraw(item) {
    let params = {
        id: item.id,
        name: item.name
    }
    fetchDelete(PATH.urlApi, params).then((json) => {
 
      storeDraw.drawList = storeDraw.drawList.filter(elt =>  elt.id != item.id )
        console.log('aaaaaaa')
      gridjs.updateConfig({
          data: storeDraw.drawList
      }).forceRender();
  
    })
}
