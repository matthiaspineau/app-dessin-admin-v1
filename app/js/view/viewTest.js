import { fetchGetTableDraw, fetchDelete } from '../fetch_data.js';
import { PATH } from "../../configUrl.js";

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

export function initView() {
    console.log('viewTest')


    document.getElementById('main').innerHTML = `<div id="d-collection"></div>`
    go()
}

function go() {
    console.log(PATH.urlApi)

    const q = {
        controller: 'DrawingController',
        action: 'getDrawsCollection',
    }
    
    gridjs.updateConfig({
        columns: ['id','drawing_title'],
        // search: {
        //     server: {
        //         url: (prev, keyword) => `${prev}?controller=${q.controller}&action=${q.action}&search=${keyword}`
        //     }
        // },
        pagination: {
          limit: 2,
          server: {
            url: (prev, page, limit) => `${prev}?controller=${q.controller}&action=${q.action}&limit=${limit}&offset=${page * limit}`
          }
        },
        server: {
          url: PATH.urlApi,
          then: data => data.data.map(item => [
            item.id, item.drawing_title
          ]),
          total: data => data.count
        } 
      }).render(document.getElementById("d-collection"));

}



class dialogModal {

  constructor(options) {
    super()

  }

  template() {
    let html = `
      <div class="">
        <div class="">
          <div class="">title</div>
          <div class="">content</div>
          <div class="">action</div>
        </div>
      </div>`
  }

}