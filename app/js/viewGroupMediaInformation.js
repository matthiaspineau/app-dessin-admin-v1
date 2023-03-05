import { fetchGetTableDraw } from "./fetch_data.js";
import { getValuesFieldText, getValuesFieldCheckbox } from "./utils/tools_form.js";
import { PATH } from "../configUrl.js";

export function initView() {
    document.getElementById("main").innerHTML = `<div id="viewGroupMediaInformation">
        ${template.formGetGroupsMediaHTML}
        ${template.restitInformation}
        ${template.formInformation}
    </div>`;
    viewGroupMediaInformation();
}


function viewGroupMediaInformation() {

    const ui = {
        main: document.querySelector('#viewGroupMediaInformation'),
        getGroupsMedia: document.querySelector('.getGroupsMedia'),
        saveInformation: document.querySelector(".saveInformation"),
        restit: document.querySelector('.restit'),
        fieldTitle: document.querySelector('.restit'),
        fieldReference: document.querySelector('.formInformation [data-field-name="group-reference"]'),
        fieldTitle: document.querySelector('.formInformation [data-field-name="group-title"]'),
        fieldDesc: document.querySelector('.formInformation [data-field-name="group-desc"]'),
        fieldIcone: document.querySelector('.formInformation [data-field-name="group-icone"]'),
        fieldActive: document.querySelector('.formInformation [data-field-name="group-active"]'),
    };
   
  
    const method = {
       
        showRestit: (data) => {
            let info = data.information

            if ( typeof info == 'string') {
                info = JSON.parse(data.information)
            }

            ui.saveInformation.setAttribute('id_group', data.id)
            ui.fieldReference.value = data.reference
            ui.fieldTitle.value = info.title != undefined ? info.title : ''
            ui.fieldDesc.value = info.description != undefined ? info.description : ''
            ui.fieldIcone.value = info.icone != undefined ? info.icone : ''
            if (data.is_active != undefined) {
                console.log(data.is_active)
                ui.fieldActive.value = data.is_active == 1 ? ui.fieldActive.setAttribute("checked", "checked") : ui.fieldActive.removeAttribute("checked")
            }

        },
        getMediaGroup: () => {
            method.fetchMediaGroup().then((json) => {
                method.showRestit(json.data[0])
                ui.restit.innerHTML = JSON.stringify(json.data)
            })
           
        },
        fetchMediaGroup: async () => {
            
            let textValue = getValuesFieldText({
            format: "objectOfValue",
            wrapper: ".getGroupsMediaInformation",
            field: '[data-field-type="text"]',
            });
        
            let data = {
            id: [textValue["group-id"]],
            };
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
        saveInformation: async () => {
   
            // let textValue = getValuesFieldText({
            //     format: "objectOfValue",
            //     wrapper: ".formInformation",
            //     field: '[data-field-type="text"]',
            //     });

                let isActive
                if (ui.fieldActive.checked) {
                    isActive = 1
                } else {
                    isActive = 0
                }
                let information = {
                    title: ui.fieldTitle.value,
                    description: ui.fieldDesc.value,
                }
                let data = {
                id: ui.saveInformation.getAttribute('id_group'),
                reference: ui.fieldReference.value,
                is_active: Number(isActive),
                information: JSON.stringify(information),
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
    };


    ui.getGroupsMedia.addEventListener('click', () => {
        console.log('click')
        method.getMediaGroup()
    })
    ui.saveInformation.addEventListener('click', () => {
        method.saveInformation()
    })

}

const template = {
    formGetGroupsMediaHTML: 
        `<div class="getGroupsMediaInformation border mt-3 p-2">
            <h5 class="h5">Selectionner un group de media</h5>
            <div class="row">
                <div class="col-4">
                    <div class="form-label">
                        <label>id du group</label>
                        <input type="text" data-field-type="text" data-field-name="group-id" name="group-id" class="form-control form-control-sm" />
                    </div>
                    <button class="btn btn-primary btn-sm getGroupsMedia">Rechercher</button>
                </div>
            </div>
        </div>
        `,
    restitInformation : 
        `<div class="restit">no information</div>`,
    formInformation: 
    `<div class="formInformation border mt-3 p-2">
        <div class="row">
            <div class="col-12">
                <h5>Ajouter un goupe</h5>
                <div class="form-label">
                    <label>Reference</label> 
                    <input type="text" data-field-type="text" data-field-name="group-reference" name="group-reference" class="form-control form-control-sm" />
                </div>
                <div>
                    <label class="form-label">Titre</label>
                    <input type="text" data-field-type="text" data-field-name="group-title" name="group-title" class="form-control form-control-sm" />
                </div>
                <div>
                    <label class="form-label">Description</label>
                    <textarea type="text" data-field-type="text" data-field-name="group-desc" name="group-desc"  class="form-control form-control-sm" aria-label="With textarea"></textarea>
                </div>
                <div>
                    <label class="form-label">Icone image bd</label>
                    <input type="text" data-field-type="text" data-field-name="group-icone" name="group-icone" class="form-control form-control-sm" />
                </div>
                <div class="form-check mt-2">
                    <input class="form-check-input form-check-input-sm" type="checkbox" data-field-type="checkbox" data-field-name="group-active" name="group-active" value="">
                    <label class="form-check-label" for="flexCheckChecked">
                        actif
                    </label>
                </div>
                
                <button class="btn btn-primary btn-sm saveInformation mt-3">Sauvegarder</button>
            </div>
        </div>
    </div>
    `
}