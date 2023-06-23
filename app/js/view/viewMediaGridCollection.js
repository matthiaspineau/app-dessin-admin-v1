import { PATH } from "../../configUrl.js";
import { ComponentDrawer } from "../components/ComponentDrawer.js";

const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

function initView() {
    let view = viewMediaGridCollection()
    document.getElementById('main').innerHTML = `<div id="viewMediaGridCollection">
            ${template.title}
            ${template.collection}
        </div>`

 
    view.method.render()
    

    // component - drawer
    const componentDrawer = ComponentDrawer({
        target: '#main',
        content: `aa`,
        hideWhenIsClosed: 'hideWhenIsClosed'
    })
    componentDrawer.method.render()

    view.component.drawer = componentDrawer
}

function viewMediaGridCollection() {
    const state = {
        limit: 10,
        offset: 0,
        page: 1,
        totalPage: 1,
        totalResult: 0,
        search: '',
        medias: [],
    };

    const component = {
        drawer: null
    }
    
    const ui = {
        totalResult: '.total-result',
        totalPage: '.total-page',
        next: '.next',
        prev: '.prev',
        page: '.page',
        view: '.grid-media-collection',
        grid: '.grid-collection',
        search: '.search-reference',
        cardMediaItem: '.cardMediaItem',
        cardMediaInDrawer: '.cardMediaInDrawer',
        selectFormatSize: '.selectFormatSize',
        btnFormatSize: '.btnFormatSize'
    };

    const method = {
        render: async () => {
            let params = {
                limit: state.limit,
                offset: state.offset
            }
            let medias = await method.fetchMedias(PATH.urlApi, params)
            state.totalResult = medias.count
            state.totalPage = Math.ceil(medias.count / state.limit)
            if (medias.success) {
                state.medias = medias.data
                document.querySelector(ui.view).innerHTML = `
                    ${template.toolbar}
                    ${template.grid}
                `
                document.querySelector(ui.totalPage).textContent = state.totalPage
                document.querySelector(ui.totalResult).textContent = state.totalResult
                method.updateGrid()
                method.initPrev()
                method.initNext()
                method.initGoPage()
                method.initSearch()
                method.initOpenMedia()
            }
        },
        updateRender: async () => {
            let params = {
                limit: state.limit,
                offset: state.offset,
                search: state.search 
            }
            let medias = await method.fetchMedias(PATH.urlApi, params)
            if (medias.success) {
                state.totalResult = medias.count
                state.totalPage = Math.ceil(medias.count / state.limit)
                document.querySelector(ui.totalPage).textContent = state.totalPage
                document.querySelector(ui.totalResult).textContent = state.totalResult
                state.medias = medias.data
                method.updateGrid()
                method.initOpenMedia()
            }
        },
        updateGrid: () => {
            let html = ''
            state.medias.forEach( media => {
                html += method.cardMedia(media)
            })
            document.querySelector(ui.grid).innerHTML = html
        },
        descriptionMediaInDrawer: (media) => {
            return `<div>
                        <div>id: ${media.id}</div>
                        <div>name: ${media.name}</div>
                        <div>original name: ${media.original_name}</div>
                        <div>reference: ${media.reference}</div>
                        <div>title: ${media.title}</div>
                        <div class="d-flex gap-3 selectFormatSize">
                            <span class="btnFormatSize cursor-p" data-format="thumbnail">thumbnail</span>
                            <span class="btnFormatSize cursor-p" data-format="small">small</span>
                            <span class="btnFormatSize cursor-p" data-format="medium">medium</span>
                            <span class="btnFormatSize cursor-p" data-format="large">large</span>
                            <span class="btnFormatSize cursor-p" data-format="original">original</span>
                        </div>
                    </div>
                    <div class="cardMediaInDrawer" 
                        data-id="${media.id}"
                        data-name="${media.name}"
                        data-original-name="${media.original_name}"
                        data-reference="${media.reference}"
                        data-title="${media.title}"
                        >
                        <img src="${PATH.urlUploadImg}medium/${media.name}" alt="img">
                    </div>`
        },
        cardMedia: (media) => {
            return `<div class="cardMediaItem" style="max-width:200px" 
                        data-id="${media.id}"
                        data-name="${media.name}"
                        data-original-name="${media.original_name}"
                        data-reference="${media.reference}"
                        data-title="${media.title}"
                        >
                        <img src="${PATH.urlUploadImg}medium/${media.name}" alt="img">
                    </div>`
        },
        fetchMedias: async (url, params) => {

            // let params = {"ids":['98', '99']}
            let data = {
               "controller": "MediaController",
               "action": "getMediaCollectionGrid",
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
        initOpenMedia: () => {
            document.querySelector(ui.grid).addEventListener('click', (e) => {
                
                if (e.target.closest(ui.cardMediaItem) != null) {
                    let elt = e.target.closest(ui.cardMediaItem)
                    let imgName = elt.dataset.name
                    component.drawer.state.content = method.descriptionMediaInDrawer({
                        id: elt.dataset.id,
                        name: elt.dataset.name,
                        original_name: elt.dataset.original_name,
                        reference: elt.dataset.reference,
                        title: elt.dataset.title
                    })
                    component.drawer.method.refreshContent()
                    component.drawer.method.open()
                    document.querySelector(ui.selectFormatSize).addEventListener('click', (e) => {
                        if(e.target.closest(ui.selectFormatSize) != null) {
                            let elt = e.target.closest(ui.btnFormatSize)
                            let size = elt.dataset.format
                            document.querySelector(ui.cardMediaInDrawer).innerHTML = `
                                <img src="${PATH.urlUploadImg}${size}/${imgName}" alt="img" />`
                        }
                    })
                } 
            })
        },
        initSearch: () => {
            document.querySelector(ui.search).addEventListener('change', (e) => {
                state.offset = 0
                state.page = 1
                state.search = e.target.value
                document.querySelector(ui.page).value = state.page
                method.updateRender()
            })
        },
        initGoPage: () => {
            document.querySelector(ui.page).addEventListener('change', (e) => {
                if (e.target.value >= 1 && e.target.value <= state.totalPage) {
                    state.offset = (e.target.value - 1) * state.limit
                    state.page = e.target.value
                    document.querySelector(ui.page).value = state.page
                    method.updateRender()
                }
            })
        },
        initPrev: () => {
            document.querySelector(ui.prev).addEventListener('click', () => {
                if (state.offset >= state.limit) {
                    state.offset = state.offset - state.limit
                    state.page = state.page - 1
                    document.querySelector(ui.page).value = state.page
                    method.updateRender()
                }
            })
        },
        initNext: () => {
            document.querySelector(ui.next).addEventListener('click', () => {
                if (state.offset < (state.totalResult - state.limit)) {
                    state.page = state.page + 1
                    state.offset = state.offset + state.limit
                    document.querySelector(ui.page).value = state.page
                    method.updateRender()
                }
            })
        }
    }

    const template = {
        toolbar: `<div class="d-flex justify-content-between mt-2 mb-2">
            <input class="search-reference form-control form-control-sm w-25" type="text" name="reference" placeholder="reference" />
            <div>
                <span class="prev cursor-p text-decoration-underline">prev</span>
                <span>
                    <span><input type="text" class="page  form-control form-control-sm d-inline-block" value="${state.page}" style="width:25px" /></span> / 
                    <span>
                        <span class="total-page">${state.totalPage}</span>
                        sur <span class="total-result">${state.total}</span>
                    </span>
                </span>
                <span class="next cursor-p text-decoration-underline">next</span>
            </div>           
        </div>`
        ,
        grid: `<div class="grid-collection d-flex flex-wrap gap-2 cursor-p">grid</div>`,
    }



    const setup = {
        component: component,
        state: state,
        ui: ui,
        method: method,
        template: template
    }
    
    return setup

}


const template = {
    title: `<div>view media grid collection</div>`,
    collection: `<div class="grid-media-collection"></div>`
}

export {  initView };