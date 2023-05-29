import {getValuesFieldText} from "../utils/tools_form.js";
import { PATH } from "../../configUrl.js";


function initView() {
    document.getElementById('main').innerHTML = `
        <div id="viewComics">
            ${template.title}
            ${template.formAddGroupMediaHTML}
        </div>`

        viewGroupMediaCreate()
}

function viewGroupMediaCreate() {
    
    const ui = {
        createGroup: '.btnAddGroupMedia',
    };

    const method = {
        addGroupMedia: async () => {
            let textValue = getValuesFieldText({
                format: 'objectOfValue',
                wrapper: '.formAddGroupMedia',
                field: '[data-field-type="text"]',
            });
        
            let data = {
                medias: {"medias": []},
                reference: textValue['group-reference'],
                information: JSON.stringify({})
            };
            data = JSON.stringify(data)
        
            let formData = new FormData();
            formData.append("controller", "MediaGroupsController");
            formData.append("action", "addMediaGroups");
            formData.append("params", data);
  
            const req = await fetch(PATH.urlApi ,{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                },
                body: formData
            })
                
            if (req.ok === true) {
                return req.json()
            } else {
                throw new Error('nouvelle erreur lors de la creation')
            }
        }
    }

    document.querySelector(ui.createGroup).addEventListener("click", () => {
        method.addGroupMedia()
    })
}



const template = {
    title: `<div>view media</div>`,
    formAddGroupMediaHTML: `
    <div class="formAddGroupMedia">
        <h5>Ajouter un goupe</h5>
        <div class="form-label">
            <label>Reference</label>
            <input type="text" data-field-type="text" data-field-name="group-reference" name="group-reference" class="form-control form-control-sm" />
        </div>
        <div>
            <button class="btn btn-primary btn-sm btnAddGroupMedia">Ajouter</textarea>
        </div>
    </div>
    `
}

export {  initView };