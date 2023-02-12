import { getFieldTypeText, getFieldTypeFileDraw, getFieldTypeCheckox, getFieldTypeSubmit } from "./models_form.js";
import {getValuesFieldText, getValuesFieldCheckbox} from "./utils/tools_form.js";
import { fetchDataFormAddDraw } from './fetch_data.js';
import { PATH } from "../configUrl.js";

export function initView() {

    document.getElementById('main').innerHTML = `<div id="form-send-draw"></div>`
    createFormAddDraw()
}

function createFormAddDraw() {
    fetchDataFormAddDraw("../../data/data-form-add-draw.json").then((data) => {
        let html = "";

        html += getFieldTypeFileDraw(data.file);
        
        html += `<div><h5>Information (optionnel)</h5>`
        html += getFieldTypeText(data.reference);  
        html += getFieldTypeText(data.title);  
        html += getFieldTypeText(data.desc);
        html += getFieldTypeCheckox(data.tags);
        html += getFieldTypeSubmit(data.button);
        html += `</div>`
        document.getElementById("form-send-draw").innerHTML = html;
        
    })
    .then(() => {
        initFormSendDraw();
    });
}



function initFormSendDraw() {
    const fieldFileDraw = document.querySelector('[data-field-name="draw-file"]');
    const formBtnAddDrawing = document.querySelector("#send-draw");

    /**
     * chager le fichier
     *  - verification fu fichier
     *  - met a jour le champs "darw-name"
     */
    fieldFileDraw.addEventListener("change", () => {

        let files = fieldFileDraw.files;
        document.querySelector('#send-draw').style.display = "block"
        document.querySelector(".feedback-file").style.display = "none";

        let errors = [];

            let i = 0
            for (const file of files) {
                console.log(i)
                let imgName = file.name;
                let imgSize = file.size;
                let imgType = file.type;
                console.log(imgName)
                 // 600000
                if (imgSize >= 10000000) {
                    errors.push("Le fichier est trop volumineux");
                }
                if (imgType != "image/png") {
                    errors.push("format de fichier non accepter");
                }

                if (errors.length > 0) {
                    document.querySelector(".feedback-file").textContent = "erreur";
                    document.querySelector(".feedback-file").style.display = "block";
                    document.querySelector('#send-draw').style.display = "none"
                    return errors;
                }

            }
    });

    formBtnAddDrawing.addEventListener("click", (e) => {
        e.preventDefault();
        getModalAfterAddDrawHTML()
        fetchUploadDrawing().then((response) => {
            
            document.querySelector('#myModal .modal-body').innerHTML = "L\'enregistrement a été fait avec succes"

            console.log('L\'enregistrement a été fait avec succes');
        });
    });

    async function fetchUploadDrawing() {
        let files = fieldFileDraw.files;


        let textValue = getValuesFieldText({
            format: 'objectOfValue',
            wrapper: '#form-send-draw',
            field: '[data-field-type="text"]',
        });

        let checkValue = getValuesFieldCheckbox({
            format: 'objectOfValue',
            wrapper: '#form-send-draw',
            field: '[data-field-wrap-type="checkbox"]',
        });
       
        if (files.length > 0) {
            
            let data = {
                nb_files: files.length,
                drawing_name: "",
                drawing_reference: textValue["draw-file-reference"],
                drawing_title: textValue["draw-file-title"],
                drawing_desc: textValue["draw-file-desc"],
                drawing_info: JSON.stringify({}),
                id_drawing_category: 1,
                drawing_tags: checkValue.tags.join(' '),
            };

            data = JSON.stringify(data);

            let formData = new FormData();
            for (const file of files) {
                formData.append("file[]", file);
            }
            formData.append("controller", "DrawingController");
            formData.append("action", "uploadImage");
            formData.append("params", data);

            const req = await fetch(PATH.urlApi, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: formData,
                }
            );

            if (req.ok === true) {
                return req.json();
            }
            throw new Error("nouvelle erreur lors de la creation");
        }
    }
}

function getModalAfterAddDrawHTML() {
console.log(document.querySelector('.dock-page #myModal'))

if (document.querySelector('.dock-page #myModal') != null) {
    myModal.show('modalToggle')
    return 
}

   
console.log('la')
// Date.now()
        let modal = document.createElement('div')
        modal.innerHTML = `
        <div class="modal" id="myModal" data-bs-modal="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn_modal-dispose" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
        `
    document.querySelector('.dock-page').appendChild(modal)
    const myModal = new bootstrap.Modal('#myModal', {})
    console.log(myModal)
      
    myModal.show('modalToggle')


    document.querySelector('#myModal').addEventListener('hidden.bs.modal', event => {
        document.querySelector('#myModal').remove()
    })
      
}
