import { PATH } from "../../configUrl.js";
function ComponentSelectGroupMedia(options = {}) {

    if (options.target == undefined) {
        console.error('il faut une target pour le fonctionnement de ce composant')
    }

    const state = {
        target: options.target,
        optionsSelect: "",
        uiid: Date.now(),
        callbackOnChange: options.callbackOnChange
    }

    const ui = {
        select: `select[data-uiid="${state.uiid}"]`
    }
    const method = {
        getMediaGroup: () => {
            method.fetchMediaGroup().then((json) => {
                state.callbackOnChange(json.data[0])
            })
           
        },
        createOptionsSelectMediaGroups: () => {

            let optionsGroup = '<option id="0">Chosir une référence</option>'
            method.fetchMediaGroupForSelectOptions().then((json) => {
                json.data.forEach(elt => {
                optionsGroup += `<option value="${elt.id}">${elt.reference} (${elt.id})</option>`
                })
                state.optionsGroup = optionsGroup
                document.querySelector(state.target).innerHTML = template.formSelectGroupMedia
                document.querySelector(ui.select).innerHTML = state.optionsGroup

                // si callback => on initialise l'event 'onChange'
                if (state.callbackOnChange != undefined) {
                    document.querySelector(ui.select).addEventListener('change', () => {
                        method.getMediaGroup()
                    })
                }
                
            })

        },
        fetchMediaGroupForSelectOptions: async () => {

            let data = {};
            data = JSON.stringify(data);

            let formData = new FormData();
            formData.append("controller", "MediaGroupsController");
            formData.append("action", "getGroupMediaCollection");
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
        fetchMediaGroup: async () => {
        
            let idGroup = document.querySelector(ui.select).value
        
            let data = { id: [idGroup] };
            data = JSON.stringify(data);
        
            let formData = new FormData();
            formData.append("controller", "MediaGroupsController");
            formData.append("action", "getGroupMediaCollection");
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
        render: () => {
            let html = '<option id="0">Chosir une référence</option>'
            method.fetchMediaGroupForSelectOptions().then((json) => {
                json.data.forEach(elt => {
                    html += `<option value="${elt.id}">${elt.reference} (${elt.id})</option>`
                })
                state.optionsSelect = html
                return html
            })                
        }
    }
    const template = {
        formSelectGroupMedia:  `<div class="getGroupsMediaInformation border mt-3 p-2">
            <h5 class="h5">Selectionner un group de media</h5>
            <div class="row">
                <div class="col-6">
                    <div class="mt-2 mb-2">
                        <select data-uiid="${state.uiid}" class="form-select form-select-sm select-groups-media" name="groups-media"></select>
                    </div>
                </div>
            </div>
        </div>`,
    }
    const setup = {
        state: state,
        ui: ui,
        method: method,
        template: template
    }

    return setup
}

export { ComponentSelectGroupMedia }