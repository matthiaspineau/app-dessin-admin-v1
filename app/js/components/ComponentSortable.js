import { PATH } from "../../configUrl.js";

const ressource = {
  pathUpload: PATH.urlUploadImg,
  sizeSmall: "original",
};

function ComponentSortable(options = {}) {
  if (options.target == undefined) {
    console.error("vous devez ajouter une target en options");
  }

  const state = {
    target: options.target,
    wrapper: options.wrapper,
  };
  const ui = {
    wrapper: options.wrapper,
    target: options.target,
    sortableCollection: "#sortable-collection",
    removeItem: ".card-sortable-media__remove",
  };

  const sortable = Sortable.create(
    document.querySelector(ui.sortableCollection),
    {
      direction: "horizontal",
    }
  );

  const method = {
    eventRemoveItem: () => {
      document.querySelectorAll(ui.removeItem).forEach((item) => {
        item.addEventListener("click", () => {
          let idRemove = item.dataset.idRemove;
          document
            .querySelector('.card-item[data-id="' + idRemove + '"]')
            .remove();
        });
      });
    },
    eventSaveOrder: () => {
      return sortable.toArray();
    },
    addItem: (item) => {
      let arrayOrder = sortable.toArray();
      if (arrayOrder.includes(item.id)) {
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

      const sortable = Sortable.create(
        document.querySelector(ui.sortableCollection),
        {
          direction: "horizontal",
        }
      );
      method.eventRemoveItem();
    },
  };

  const template = {};

  const setup = {
    state: state,
    ui: ui,
    method: method,
    template: template,
  };

  return setup;
}

export { ComponentSortable };
