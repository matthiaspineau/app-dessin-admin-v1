import { fetchGetTableDraw } from "../fetch_data.js";
import { PATH } from "../../configUrl.js";

const ressource = {
    pathUpload: PATH.urlUploadImg,
    sizeSmall: "original",
};

function ComponentTableGridMedias() {
    const gridjs = new window.gridjs.Grid();

    const state = {

    }
    const ui = {
        target: '#table-media-collection-gridjs'
    }
    const method = {
        render: () => {
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
                                  src: row.cells[2].data,
                                };
                                state.medias_tmp_collection_table.push(item);
                                document.querySelector(".nb-media").innerHTML =
                                  state.medias_tmp_collection_table.length;
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
                  .render(document.querySelector(ui.target));
              });
        }
    }
    const template = {

    }

    const setup = {
        state: state,
        ui: ui,
        method: method,
        template: template,
        gridjs: gridjs
    }
    
    return setup

}

export { ComponentTableGridMedias }