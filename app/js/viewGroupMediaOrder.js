import { fetchGetTableDraw } from "./fetch_data.js";
import { getValuesFieldText } from "./utils/tools_form.js";
import "../../lib/sortable/sortable.min.js";
import { PATH } from "../configUrl.js";

const ressource = {
  pathUpload: PATH.urlUploadImg,
  sizeSmall: "original",
};

const gridjs = new window.gridjs.Grid();

const state = {
  medias_tmp_collection_table: [],
  medias_tmp_collection_group: [],
  medias_tmp_collection_fusionned: [],
  medias: [],
};

export function initView() {
  document.getElementById(
    "main"
  ).innerHTML = `<div id="viewGroupMediaOrder"></div>`;
  viewGroupMediaOrder();
}

function viewGroupMediaOrder() {
  document.getElementById("viewGroupMediaOrder").innerHTML = `
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" id="tabsComponent" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="get-media-tab" data-bs-toggle="tab" data-bs-target="#get-media" type="button" role="tab" aria-controls="get-media" aria-selected="false">Collection media</button>
        </li>
        <li class="nav-item" role="presentation">
				<button class="nav-link" id="get-group-media-tab" data-bs-toggle="tab" data-bs-target="#get-group-media" type="button" role="tab" aria-controls="get-group-media" aria-selected="false">Collection groupe</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="edit-order-tab" data-bs-toggle="tab" data-bs-target="#edit-order" type="button" role="tab" aria-controls="edit-order" aria-selected="false">Ordonné les médias</button>
        </li>
        </ul>
        
        <!-- Tab panes -->
        <div class="tab-content">
        <div class="tab-pane" id="get-media" role="tabpanel" aria-labelledby="add-media-tab" tabindex="0"></div>
        <div class="tab-pane" id="get-group-media" role="tabpanel" aria-labelledby="aa-tab" tabindex="0"></div>
        <div class="tab-pane" id="edit-order" role="tabpanel" aria-labelledby="edit-order-tab" tabindex="0"></div>
        </div>`;

  // tabs
  const bsTab = new bootstrap.Tab("#tabsComponent");
  const tabEl = document.querySelectorAll('button[data-bs-toggle="tab"]');
  tabEl.forEach((elt) => {
    elt.addEventListener("shown.bs.tab", (event) => {
      event.target;
      event.relatedTarget;

      let idTarget = event.target.dataset.bsTarget;

      switch (idTarget) {
  
        case "#get-media":
          document.querySelector(idTarget).innerHTML = `<div>
                        <div id="">
                            <div class="row">
                                <div class="col-md-6">
                                    <div>nb media : <span class="nb-media">${state.medias.length}</span></div>
                                    <button class="btn btn-primary btn-sm act-2 refreshList">Vider la liste</button>
                                </div> 
                            </div>
                        </div>
                        <div id="table-media-collection-gridjs"></div>
                    </div>`;
          createTableMediaCollection();
 
					document.querySelector(".refreshList").addEventListener("click", () => {
            state.medias_tmp_collection_table = []
          });

          break;
        case "#get-group-media":
		
          document.querySelector(idTarget).innerHTML = `
								<div class="formMediaGroups border mt-3 p-2">
									<h5 class="h5">Media d'un groupe</h5>
									<div class="row">
											<div class="col-4">
													<div class="form-group formGetGroupsMedia">
															<label>id du group</label>
															<input type="text" data-field-type="text" data-field-name="group-id" name="group-id" class="form-control form-control-sm" />
													</div>
													<button class="btn btn-primary btn-sm mt-2 actMediaOfGroup">Rechercher</button>
											</div>
									</div>
								</div>
								`;
       
							document.querySelector('.actMediaOfGroup').addEventListener('click', () => {
								getGroupsMedia().then((json) => {
									state.medias_tmp_collection_group = JSON.parse(json.data[0].medias ).medias
								})
							})
          break;
        case "#edit-order":
          document.querySelector(idTarget).innerHTML = `
						<div id="edit-order-media">
							<div id="order-step-stored" class="row mt-2 mb-2">
									<h5>liste des media</h5>
									<div>
											<button data-tmp-list="medias_tmp_collection_table" class="use-list-from btn btn-primary btn-sm mr-2">Liste tableau</button>
											<button data-tmp-list="medias_tmp_collection_group" class="use-list-from btn btn-primary btn-sm mr-2">Liste group</button>
											<button data-tmp-list="medias_tmp_collection_fusionned" class="use-list-from btn btn-primary btn-sm mr-2">Liste fusionné</button>
									</div>
							</div>

							<div class="mt-2 mb-2">
									<h5>liste utilisé</h5>
							</div>

							<ul id="sortable-collection" class="card-sortable-media__container"></ul>
							<div class="mt-3">
									<button class="btn btn-primary btn-sm save-order">sauvegarder</button>
							</div>
							<div>${templateFormAddGroupsMediaAddMediasHTML()}</div>
					</div>`;

          componentOrder();

          document.querySelector(".formMediaGroupsAddMedias .save-medias-group").addEventListener("click", () => {
						addGroupsMediaListMedias();
					});

          break;

        default:
          break;
      }
    });
  });
}

/* ---------------------------------- */
/* ---------------------------------- */
/**
 * Order media
 */

function componentOrder() {
  const ui = {
    useListCollectionTable: document.querySelector(
      '.use-list-from[data-tmp-list="medias_tmp_collection_table"]'
    ),
    useListCollectionGroup: document.querySelector(
      '.use-list-from[data-tmp-list="medias_tmp_collection_group"]'
    ),
    useListCollectionFusionned: document.querySelector(
      '.use-list-from[data-tmp-list="medias_tmp_collection_fusionned"]'
    ),
    sortableCollection: document.querySelector("#sortable-collection"),
    removeItem: document.querySelectorAll(".card-sortable-media__remove"),
    saveOrder: document.querySelector(".save-order"),
  };
  const sortable = Sortable.create(ui.sortableCollection, {
    direction: "horizontal",
  });
  const method = {
    saveOrder: () => {
      let sortOrder = sortable.toArray();
      let medias = [];
      sortOrder.forEach((order) => {
        state.medias_tmp_collection_table.filter((media) => {
          if (media.id == order) {
            let item = {
              id: media.id,
              src: media.src,
            };

            medias.push(item);
          }
        });
      });


      state.medias = medias;
    },
    renderList: (flag = "") => {
      let tmp_list = [];
      switch (flag) {
        case "medias_tmp_collection_table":
          tmp_list = state.medias_tmp_collection_table;
          break;
        case "medias_tmp_collection_group":
          tmp_list = state.medias_tmp_collection_group;
          break;
        case "medias_tmp_collection_fusionned":
          let list_fusionned = [];
          tmp_list = list_fusionned.concat(
            state.medias_tmp_collection_table,
            state.medias_tmp_collection_group
          );
          break;
        default:
          tmp_list = state.medias_tmp_collection_table;
          break;
      }

      let mediaHtml = ``;

      tmp_list.forEach((media) => {
        mediaHtml += `
					<li class="card-sortable-media__content card-item" data-id="${media.id}">
							<div class="card-sortable-media__remove" data-id-remove="${media.id}">retirer</div>
							<div class="card-sortable-media__img"><img src="${ressource.pathUpload}small/${media.src}" alt="media"></div>
							<div class="card-sortable-media__desc">id: ${media.id}</div>
					</li>
					`;
      });

      ui.sortableCollection.innerHTML = mediaHtml;

      const sortable = Sortable.create(ui.sortableCollection, {
        direction: "horizontal",
      });
      ui.removeItem = document.querySelectorAll(".card-sortable-media__remove");
      ui.removeItem.forEach((item) => {
        item.addEventListener("click", () => {
          let idRemove = item.dataset.idRemove;
          document
            .querySelector('.card-item[data-id="' + idRemove + '"]')
            .remove();
        });
      });
    },
  };

  ui.useListCollectionTable.addEventListener("click", () => {
    method.renderList("medias_tmp_collection_table");
  });
  ui.useListCollectionGroup.addEventListener("click", () => {
    method.renderList("medias_tmp_collection_group");
  });
  ui.useListCollectionFusionned.addEventListener("click", () => {
    method.renderList("medias_tmp_collection_fusionned");
  });
  ui.saveOrder.addEventListener("click", () => {
    method.saveOrder();
  });
  method.renderList();
}

/* ---------------------------------- */
/* ---------------------------------- */

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
                `;
  return html;
}


async function getGroupsMedia() {
  let textValue = getValuesFieldText({
    format: "objectOfValue",
    wrapper: ".formGetGroupsMedia",
    field: '[data-field-type="text"]',
  });

  let data = {
    id: [textValue["group-id"]],
  };
  data = JSON.stringify(data);

  let formData = new FormData();
  formData.append("controller", "MediaGroupsController");
  formData.append("action", "getGroupMedia");
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
}


/**
 * collection medias table
 */
function createTableMediaCollection() {
  fetchGetTableDraw(PATH.urlApi).then((json) => {
    if (json.data == undefined) {
      return;
    }

    gridjs
      .updateConfig({
        columns: [
          "id",
          "drawing_name",
          "drawing_title",
          "id_drawing_category",
          {
            name: "image",
            data: null,
            formatter: (_, row) =>
              window.gridjs.html(`
                        <img src="${
                          ressource.pathUpload + "small/" + row.cells[1].data
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
                    "py-2 px-4 border rounded-md text-white bg-blue-600",
                  onClick: () => {
                    let item = {
                      id: row.cells[0].data,
                      src: row.cells[1].data,
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
      .render(document.getElementById("table-media-collection-gridjs"));
  });

}


/**
 * save list media in bdd
 */
async function addGroupsMediaListMedias() {
  let textValue = getValuesFieldText({
    format: "objectOfValue",
    wrapper: ".formMediaGroupsAddMedias",
    field: '[data-field-type="text"]',
  });

  let data = {
    id: textValue["group-id"],
    medias: JSON.stringify({ medias: state.medias }),
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
}
