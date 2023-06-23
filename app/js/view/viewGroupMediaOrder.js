import { fetchGetTableDraw } from "../fetch_data.js";
import "../../../lib/sortable/sortable.min.js";
import { PATH } from "../../configUrl.js";
import { ComponentSelectGroupMedia } from "../components/ComponentSelectGroupMedia.js";
import { ComponentSortable } from "../components/ComponentSortable.js";
import { fetchMedias } from "../utils/fetchMedias.js";
import { ComponentDrawer } from "../components/ComponentDrawer.js";
import { ComponentDialog } from "../components/ComponentDialog.js";

const ressource = {
  pathUpload: PATH.urlUploadImg,
  sizeSmall: "original",
};

const gridjs = new window.gridjs.Grid();

export function initView() {
  document.getElementById("main").innerHTML = `<div id="viewGroupMediaOrder">
    ${template.title}
    ${template.containerGroupSelectMedia}
    ${template.containerGroupMedia}
  </div>`;
  const view = viewGroupMediaOrder();

  // component - select groupe media
  const componentSelectGroupMedia = ComponentSelectGroupMedia({
    target: '.container-group-select-media',
    callbackOnChange: view.method.loadGroupMedia
  })
  componentSelectGroupMedia.method.createOptionsSelectMediaGroups()

  //adjust pour le drawer
  document.querySelector('#viewGroupMediaOrder').style.paddingRight = '100px'
  
  // component - drawer
  const componentDrawer = ComponentDrawer({
    target: '#main',
    content: `${template.table}`
  })
  componentDrawer.method.render()

  view.method.renderTableGrid()
}

function viewGroupMediaOrder() {

  const componentSortable = ComponentSortable({
    target: '#sortable-collection',
    wrapper: '.wrapper-sortable',
  })

  const state = {
    groupMedia: null,
    componentSortable: null,
    orderMedias: [],
    idsMedias: []
  }

  const ui = {
    titleGroup: '.title-group',
    containerGroupMedia: '.container-group-media',
    tableGridJs: '#table-media-collection-gridjs',
    saveOrder: '.save-order'
  }
 
  const template = {
    saveOrder: `<div>
        <button class="btn btn-primary mt-3 save-order">Sauvegarder la disposition</button>
      </div>`,
  }

  const method = {
    loadGroupMedia: async (groupMedia) => {

      state.groupMedia = groupMedia
      document.querySelector(ui.titleGroup).innerHTML = state.groupMedia.reference
      let result = await fetchMedias(PATH.urlApi, {ids: JSON.parse(state.groupMedia.ids_medias)['ids_medias']})
      
      document
              .querySelector(ui.containerGroupMedia)
              .insertAdjacentHTML("beforeend", template.saveOrder);
      document.querySelector(ui.saveOrder).addEventListener('click', method.saveOrder)

      // ----- sort array result
      let arrayTmp = [];
      let arrayOrder = JSON.parse(state.groupMedia.ids_medias)['ids_medias'];
      arrayOrder.forEach( id => {
        result.data.find(elt => {
          if (elt.id == id) {
            arrayTmp.push(elt)
          }
        })
      });
      state.idsMedias = arrayTmp
      // -----

      componentSortable.state.medias = state.idsMedias
      componentSortable.state.idGroupMedia = state.groupMedia.id
      componentSortable.method.render()
    },
    addGroupsMediaListMedias: async () => {
      let data = {
        id: state.groupMedia.id,
        ids_medias: JSON.stringify({ ids_medias: state.idsMedias }),
      };
      data = JSON.stringify(data);

      let formData = new FormData();
      formData.append("controller", "MediaGroupsController");
      formData.append("action", "updateMediasGroups");
      formData.append("params", data);

      const req = await fetch(PATH.urlApi, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (req.ok === true) {
        return req.json();
      } else {
        throw new Error("nouvelle erreur lors de la creation");
      }
    },
    saveOrder: async () => {
      state.idsMedias = componentSortable.method.eventSaveOrder()
      let result = await method.addGroupsMediaListMedias()
      const componentDialog = ComponentDialog({
        title: 'Notification',
        content: 'aa'
      })
      if (result.success) {
        componentDialog.state.content = 'success'
        componentDialog.method.open()
      } else {
        componentDialog.state.content = 'error'
        componentDialog.method.open()
      }
    },
    renderTableGrid: () => {

      fetchGetTableDraw(PATH.urlApi).then((json) => {
        if (json.data == undefined) {
          return;
        }
    
        gridjs
          .updateConfig({
            columns: [
              "id",
              "original_name",
              "name",
              "reference",
              {
                name: "image",
                data: null,
                formatter: (_, row) =>
                  window.gridjs.html(`
                            <img src="${
                              ressource.pathUpload + "thumbnail/" + row.cells[2].data
                            }" 
                  alt="img" style="width:25px;max-width:100%;height:auto;" />`),
              },
              {
                name: "store",
                formatter: (cell, row) => {
                  return window.gridjs.h(
                    "button",
                    {
                      className:
                        "py-2 px-4 border rounded-md text-white bg-blue-600 action-store",
                      onClick: () => {
                        let item = {
                          id: row.cells[0].data,
                          original_name: row.cells[1].data,
                          name: row.cells[2].data,
                        };
                        componentSortable.method.addItem(item)
                      },
                    },
                    "Store"
                  );
                },
              },
            ],
            data: json.data,
            sort: true,
            search: true,
            pagination: {
              limit: 10,
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
          })
          .render(document.querySelector(ui.tableGridJs));
      });
    }
  }

  const setup = {
    state: state,
    ui: ui,
    method: method,
    template: template
  }

  return setup

}


const template = {
  title: `<div>view media order</div>`,
  containerGroupSelectMedia: `<div class="container-group-select-media"></div>`,
  containerGroupMedia: `<div class="container-group-media">
    <div class="title-group"></div>
    <div class="wrapper-sortable">
      <div id="sortable-collection" class="card-sortable-media__container"></div>
    </div>
  </div>`,
  table: `<div id="table-media-collection-gridjs"></div>`
}