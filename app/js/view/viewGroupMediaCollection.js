import { PATH } from "../../configUrl.js";

const gridjs = new window.gridjs.Grid();

function initView() {
  document.getElementById('main').innerHTML = `<div id="viewGroupMediaCollection">
        <div class="table-group-collection"></div>
    </div>`;
  viewGroupMediaCollection();
}

function viewGroupMediaCollection() {

  const ui = {
    tableGroupCollection: '.table-group-collection'
  }

  const method = {
    createTable: () => {
      const q = {
        controller: "MediaGroupsController",
        action: "getGroupMediaCollection",
      };

      gridjs
        .updateConfig({
          columns: ["id", "reference", "is_active",
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
                          if (window.confirm("Voulez supprimer ce groupe ?")) {
                              method.deleteGroupMedia(item)
                          }
                      }
                  }, 'Supprimer');
              }
          },
        ],
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
        .render(document.querySelector(ui.tableGroupCollection));
    },
    deleteGroupMedia: (item) => {
      console.log(item)
      console.log('delete group')

      let params = {
        id: item.id,
        name: item.name
      }
      method.fetchDeleteGroupMedia(PATH.urlApi, params).then((json) => {
 
      })
    },
    fetchDeleteGroupMedia: async (url, item) => {

      let params = {"id": item.id, "name": item.name}

      let data = {
         "controller": "MediaGroupsController",
         "action": "deleteGroupMedia",
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
      } else {

        throw new Error('nouvelle erreur lors de la creation')
      }
    
  }
  };

  method.createTable();
}

export { initView };
