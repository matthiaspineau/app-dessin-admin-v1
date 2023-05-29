import { PATH } from "../../configUrl.js";

const ressource = {
  pathUpload: PATH.urlUploadImg,
  sizeSmall: "original",
};

function ComponentSortable(options = {}) {
  if (options.target == undefined) {
    console.error("vous devez ajouter une target en options");
  }
  if (options.idGroupMedia == undefined) {
    console.error("il manque l id du group media");
  }

  const state = {
    medias: options.medias != undefined ? options.medias : [],
    target: options.target,
    wrapper: options.wrapper,
    idsOrder: [],
    idGroupMedia: options.idGroupMedia,
  };
  const ui = {
    wrapper: options.wrapper,
    target: options.target,
    sortableCollection: "#sortable-collection",
    removeItem: ".card-sortable-media__remove",
    saveOrder: ".save-order",
  };

  const sortable = Sortable.create(
    document.querySelector(ui.sortableCollection),
    {
      direction: "horizontal",
    }
  );

  const method = {
    addGroupsMediaListMedias: async () => {
      let data = {
        id: state.idGroupMedia,
        medias: JSON.stringify({ medias: state.idsOrder }),
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
    eventRemoveItem: () => {
      document.querySelectorAll(ui.removeItem).forEach((item) => {
        item.addEventListener("click", () => {
          let idRemove = item.dataset.idRemove;
          document
            .querySelector('.card-item[data-id="' + idRemove + '"]')
            .remove();
          //   console.log(state.medias.find(item => item.id == idRemove))
        });
      });
    },
    eventSaveOrder: async () => {
      document.querySelector(ui.saveOrder).addEventListener("click", () => {
        state.idsOrder = sortable.toArray();
        method.addGroupsMediaListMedias();
        document.querySelector('#main').innerHTML = ''
      });
    },
    addItem: (item) => {
      let arrayOrder = sortable.toArray();
      if (arrayOrder.includes(item.id)) {
        // console.log('l item existe deja')
        return;
      }
      state.medias.push(item);
      method.renderItem(item);
    },
    itemHtml: (media) => {
      return `<li class="card-sortable-media__content card-item" data-id="${media.id}">
              <div class="card-sortable-media__remove" data-id-remove="${media.id}">retirer</div>
              <div class="card-sortable-media__img"><img src="${ressource.pathUpload}small/${media.name}" alt="media"></div>
              <div class="card-sortable-media__desc">${media.original_name} (${media.id})</div>
            </li>
              `;
    },
    renderItem: (media) => {
      let mediaHtml = method.itemHtml(media);
      document
        .querySelector(ui.sortableCollection)
        .insertAdjacentHTML("beforeend", mediaHtml);
    },
    render: () => {
      let mediaHtml = ``;
      state.medias.forEach((media) => {
        mediaHtml += method.itemHtml(media);
      });

      document.querySelector(ui.sortableCollection).innerHTML = mediaHtml;
      document
        .querySelector(ui.wrapper)
        .insertAdjacentHTML("beforeend", template.saveOrder);

      const sortable = Sortable.create(
        document.querySelector(ui.sortableCollection),
        {
          direction: "horizontal",
        }
      );
      method.eventRemoveItem();
      method.eventSaveOrder();
    },
  };

  const template = {
    saveOrder: `<div>
          <button class="btn btn-primary mt-3 save-order">Sauvegarder la disposition</button>
        </div>`,
  };

  const setup = {
    state: state,
    ui: ui,
    method: method,
    template: template,
  };

  return setup;
}

export { ComponentSortable };
