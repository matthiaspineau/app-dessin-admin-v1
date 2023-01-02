import { getFieldTypeText, getFieldTypeFileDraw, getFieldTypeCheckox, getFieldTypeSubmit } from "./models_form.js";
import {getValuesFieldText, getValuesFieldCheckbox} from "./tools_form.js";
import { fetchDataFormAddDraw } from './fetch_data.js';
import { PATH } from "../configUrl.js";


function viewCreateComics() {
    createFormAddComics()
}


function createFormAddComics() {
    fetchDataFormAddDraw("../../data/data-form-add-comics.json").then((data) => {
        let html = "";

        html += getFieldTypeFileDraw(data.reference);
        html += getFieldTypeText(data.title);  
        
        html += getFieldTypeText(data.desc);
        html += getFieldTypeSubmit(data.button);
    
        document.getElementById("form-send-draw").innerHTML = html;
        
    })
    .then(() => {
        initFormAddComics();
    });
}


function initFormAddComics() {
    const formBtnAddComics = document.getElementById('send-comics')
    formBtnAddComics.addEventListener("click", (e) => {
        e.preventDefault();

        fetchAddComics().then((response) => {
            console.log(response);
            // let configNotification = {
            //     content: 'L\'enregistrement a été fait avec succes'
            // }
            // componentsNotification(configNotification)
        });
    });

    // async function fetchUploadDrawing() {
        
        
    // }
}

export { viewCreateComics };