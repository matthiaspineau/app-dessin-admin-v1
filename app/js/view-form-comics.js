import { getFieldTypeText, getFieldTypeFileDraw, getFieldTypeCheckox, getFieldTypeSubmit } from "./models_form.js";
import {getValuesFieldText, getValuesFieldCheckbox} from "./tools_form.js";
import { fetchDataFormAddDraw, fetchAddComics } from './fetch_data.js';
import { PATH } from "../configUrl.js";


function viewFormComics() {
    createFormAddComics()
}


function createFormAddComics() {
    fetchDataFormAddDraw("../../data/data-form-add-comics.json").then((data) => {
        let html = "";

        html += getFieldTypeText(data.reference);  
        html += getFieldTypeText(data.title);
        html += getFieldTypeText(data.idDrawIcone);
        html += getFieldTypeText(data.desc);
        html += getFieldTypeText(data.idsDraw);
        html += getFieldTypeSubmit(data.button);
    
        document.getElementById("form-add-comics").innerHTML = html;
        
    })
    .then(() => {
        initFormAddComics();
    });
}


function initFormAddComics() {
    const formBtnAddComics = document.getElementById('send-comics')
    formBtnAddComics.addEventListener("click", (e) => {
        e.preventDefault();


        let textValue = getValuesFieldText({
            format: 'objectOfValue',
            wrapper: '[data-form-wrap-name="form-add-comics"]',
            field: '[data-field-type="text"]',
        });


        console.log(textValue)

        let formatInformationJson = {
            title: textValue['comics-title'],
            desc: textValue['comics-desc'],
            id_draw_icone: textValue['comics-id-draw-icone'],
            ids_draw: textValue['comics-ids-draw'].split(' '),
        }

        let data = {
            reference: textValue['comics-reference'],
            information: JSON.stringify(formatInformationJson)
        };

        console.log(data)

        fetchAddComics(data).then((response) => {
            console.log(response);
            
        });
    });

    // async function fetchUploadDrawing() {
        
        
    // }
}

export { viewFormComics };