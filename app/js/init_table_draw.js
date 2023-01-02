import { fetchGetTableDraw, fetchDelete, fetchGetDraw } from './fetch_data.js';
import { PATH } from "../configUrl.js";

const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'small'
}

const storeDraw = {
    drawList: [],
    drawId: 0,
    drawItem: {}
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
            // columns: ['id', 'drawing_name', 'drawing_title', 'id_drawing_category', 'img'],
            columns: [
                'id',
                'drawing_name',
                'drawing_title',
                'id_drawing_category',
                { 
                  name: 'image',
                  data: null,
                    formatter: (_, row) => window.gridjs.html(`
                        <img 
                            src="${ressource.pathUpload+'small/'+(row.cells[1].data)}" 
                            alt="img" style="width:32px;max-width:100%;height:auto;" />`)
                },
                { 
                    name: 'Actions',
                    formatter: (cell, row) => {
                      return window.gridjs.h('button', {
                        className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                        // onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
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
             ],
            data: json.data,
            sort: true,
            search: true,
            pagination: true,
            // fixedHeader: true,
            // height: '500px',
          }).render(document.getElementById("table-get-draw-gridjs"));

        // grid.on('rowClick', (...args) => console.log('row: ' + JSON.stringify(args), args));
        // grid.on('cellClick', (...args) => console.log('cell: ' + JSON.stringify(args), args));
                
    })

    // console.log(gridjs)
}
function renderTableDraw(grid, data) {
    grid.updateConfig({
        // columns: ['id', 'drawing_name', 'drawing_title', 'id_drawing_category', 'img'],
        columns: [
            'id',
            'drawing_name',
            'drawing_title',
            'id_drawing_category',
            { 
              name: 'image',
              data: null,
                formatter: (_, row) => window.gridjs.html(`
                    <img 
                        src="${ressource.pathUpload+'small/'+(row.cells[1].data)}" 
                        alt="img" style="width:32px;max-width:100%;height:auto;" />`)
            },
            { 
                name: 'Actions',
                formatter: (cell, row) => {
                  return window.gridjs.h('button', {
                    className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                    // onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
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
         ],
        data: data,
        sort: true,
        search: true,
        pagination: true,
      }).forceRender();

}

function deleteDraw(item) {
    let params = {
        id: item.id,
        name: item.name
    }
    fetchDelete(PATH.urlApi, params).then((json) => {
 
        storeDraw.drawList = storeDraw.drawList.filter(elt =>  elt.id != item.id )
        renderTableDraw(gridjs, storeDraw.drawList)
  
    })
}

// function switchAction(action) {

//     switch (action) {
//         case "delete":  

//             let params = {
//                 id: storeDraw.drawItem[0].id,
//                 name: storeDraw.drawItem[0].drawing_name
//             }
//             console.log(params)
//             fetchDelete(PATH.urlApi, params).then((json) => {

//                 if (json.success) {

//                     storeDraw.drawList = storeDraw.drawList.filter(elt => elt.id != storeDraw.drawId)
//                     storeDraw.drawItem = []
//                     storeDraw.drawId = 0
//                     // console.log(storeDraw)
//                     createTableDraw()
//                 }
//             })
//             break;
//         case "aa":
//             // htmlTemplate = `<div id="table-get-draw" data-form-wrap-name="table-get-draw" dock-main-template="table-get-draw"></div>`
//             // createTemplate(htmlTemplate)
//             break;
//         case "aaa":
//             // htmlTemplate = `<div id="table-get-draw" data-form-wrap-name="table-get-draw" dock-main-template="table-get-draw"></div>`
//             // createTemplate()
//             break;
//         default:
//             break;
//     }
// }

export { createTableDraw };
