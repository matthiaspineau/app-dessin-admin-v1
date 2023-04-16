import { PATH } from "../../configUrl.js";

const gridjs = new window.gridjs.Grid();

function initView() {
  document.getElementById('main').innerHTML = `<div id="viewGroupMediaCollection">
        <div id="table-group-collection-gridjs"></div>
    </div>`;
  viewGroupMediaCollection();
}

function viewGroupMediaCollection() {
  //const ui = {
  // main: document.querySelector('#viewGroupMediaInformation'),
  // };

  const method = {
    createTable: () => {
      const q = {
        controller: "MediaGroupsController",
        action: "getGroupMediaCollection",
      };

      gridjs
        .updateConfig({
          columns: ["id", "reference", "is_active"],
          sort: true,
          search: true,
          server: {
            url: PATH.urlApi,
            then: data => data.data.map(item => [
                item.id,item.reference,item.is_active,
              ]),
            total: data => data.count
          },
          pagination: {
            limit: 10,
            server: {
              url: (prev, page, limit) =>  `${prev}?controller=${q.controller}&action=${q.action}&limit=${limit}&offset=${page * limit}`,
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
        })
        .render(document.getElementById("table-group-collection-gridjs"));
    },
  };

  method.createTable();
}

const template = {
  a: `<div class="border mt-3 p-2">a</div>`,
};

export { initView };
