import {getValuesFieldText} from "./utils/tools_form.js";
import  '../../lib/sortable/sortable.min.js';
import { PATH } from "../configUrl.js";


const ressource = {
    pathUpload:  PATH.urlUploadImg,
    sizeSmall:  'original'
}

function initView() {
    document.getElementById('main').innerHTML = `
        <div id="viewComics">
            ${template.formAddGroupMediaHTML}
        </div>`

        viewGroupMediaCreate()
}

function viewGroupMediaCreate() {
    
    const ui = {
        createGroup: document.querySelector('.btnAddGroupMedia'),
    };

    const method = {
        addGroupMedia: async () => {
            let textValue = getValuesFieldText({
                format: 'objectOfValue',
                wrapper: '.formAddGroupMedia',
                field: '[data-field-type="text"]',
            });
            
            let formatInformationJson = {
                title: textValue['group-title'],
                desc: textValue['group-desc'],
                icone: textValue['group-icone'],
            }
        
            let data = {
                reference: textValue['group-reference'],
                information: JSON.stringify(formatInformationJson)
            };
            data = JSON.stringify(data)
        
            let formData = new FormData();
            formData.append("controller", "MediaGroupsController");
            formData.append("action", "addMediaGroups");
            formData.append("params", data);
            console.log(formData)
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

    ui.createGroup.addEventListener("click", () => {
        method.addGroupMedia()
    })
}



const template = {
    formAddGroupMediaHTML: `
    <div class="formAddGroupMedia">
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
            <label class="form-label">description</label>
            <textarea type="text" data-field-type="text" data-field-name="group-desc" name="group-desc"  class="form-control form-control-sm" aria-label="With textarea"></textarea>
        </div>
        <div>
            <label class="form-label">Icone image bd</label>
            <input type="text" data-field-type="text" data-field-name="group-icone" name="group-icone" class="form-control form-control-sm" />
        </div>
        <div>
            <button class="btn btn-primary btn-sm btnAddGroupMedia">Ajouter</textarea>
        </div>
    </div>
    `
}


// /**
//  * 
//  */
// function getComicsCollection() {

//     const q = {
//         controller: 'ComicsController',
//         action: 'getComicsCollection',
//     }
    
//     gridjs.updateConfig({
//         columns: ['id', 'reference', 'is_active'],
//         search: true,
//         pagination: {
//             limit: 10
//         },
//         server: {
//           url: PATH.urlApi+`?controller=${q.controller}&action=${q.action}`,
//           then: data => data.data.map(item => [
//             item.id, item.reference, item.is_active
//           ]),
//         } 
//       }).render(document.getElementById("d-collection"));

// }

export {  initView };