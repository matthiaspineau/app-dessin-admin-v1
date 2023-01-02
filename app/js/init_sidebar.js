import { fetchDataSidebarItems } from './fetch_data.js';
import { createFormAddDraw } from './init_form_send_draw.js';
import { createTableDraw } from './init_table_draw.js'


function createSidebar() {
    fetchDataSidebarItems("../../data/data-sidebar-list.json").then((data) => {

        let html = createSidebarList(data.items)
        document.querySelector("[data-dock-sidebar-id='dock-sidebar']").innerHTML = html;
    }).then(() => {
        initSidebar()
    })
}

function initSidebar() {
    addListernerOnItem()
}

function addListernerOnItem() {

    let items = document.querySelectorAll("[data-dock-sidebar-id='dock-sidebar'] [data-dock-sidebar-item='item']")


    items.forEach(item => {
        item.addEventListener('click', () => {
            let action = item.dataset.dockSidebarAction
            console.log(action)
            switchAction(action)
        })
    })
}

function switchAction(action) {
    let htmlTemplate = ''
    switch (action) {
        case "get-form-add-draw":  
            htmlTemplate = `<div id="form-send-draw" data-form-wrap-name="form-add-drawing" dock-main-template="form-add-drawing"></div>`
            createDockMain(htmlTemplate)
            createFormAddDraw()
            break;
        case "get-table-draw":
            htmlTemplate = `<div id="table-get-draw" data-form-wrap-name="table-get-draw" dock-main-template="table-get-draw">
                                <div id="table-get-draw-gridjs"></div>
                            </div>`
            createDockMain(htmlTemplate)
            createTableDraw()
            break;
        case "get-draws-view":
            htmlTemplate = `<div id="table-get-draw" data-form-wrap-name="table-get-draw" dock-main-template="table-get-draw"></div>`
            createDockMain()
            break;
        case "get-draws-view":
            htmlTemplate = `<div id="form-add-comics" data-form-wrap-name="form-add-comics" dock-main-template="form-add-comics"></div>`
            viewCreateComics()
            break;
        default:
            break;
    }
}

export { createSidebar };
