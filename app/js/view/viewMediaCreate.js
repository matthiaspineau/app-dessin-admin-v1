import { PATH } from "../../configUrl.js";
import { ComponentDialog } from "../components/ComponentDialog.js";

function initView() {
    document.getElementById('main').innerHTML = `<div id="viewMedia">
            <div class="view-title">${template.title}</div>
            <div class="view-content">${template.formCreateMedia}</div>
            <div class="loader-ui"></div>
        </div>`

        viewMediaCreate()
}

function viewMediaCreate() {
    
    const ui = {
        createMedia: document.querySelector('.createMedia'),
        mediaFile: document.querySelector('.formCreateMedia [name="media-file"]'),
        mediaReference: document.querySelector('.formCreateMedia [name="reference"]'),
        feedbackFile: document.querySelector('.formCreateMedia .feedback-file'),
        formCreateMedia: document.querySelector('.formCreateMedia'),
        loader: document.querySelector('.loader-ui'),
    };

    const method = {
        fileChange: () => {
            let files = ui.mediaFile.files;
            ui.createMedia.style.display = "block"
            ui.feedbackFile.style.display = "none";

            let errors = [];

            let i = 0
            for (const file of files) {
  

                let imgName = file.name;
                let imgSize = file.size;
                let imgType = file.type;
        
                // 600000
                if (imgSize >= 10000000) {
                    errors.push("Le fichier est trop volumineux");
                }
                if (imgType != "image/png") {
                    errors.push("format de fichier non accepter");
                }

                if (errors.length > 0) {
                    ui.feedbackFile.textContent = "erreur";
                    ui.feedbackFile.style.display = "block";
                    ui.createMedia.style.display = "none"
                    return errors;
                }

            }
        },
        createMedia: () => {
            ui.loader.style.display = 'block'
            method.uploadMedia().then((json) => {
                ui.loader.style.display = 'none'

                const dialog =  ComponentDialog({
                    title: 'creation média',
                    content: json.desc,
                })
                dialog.method.open()
            })
        },
        uploadMedia: async () => {
            let files = ui.mediaFile.files;
       
            if (files.length > 0) {
                
                let data = {
                    nb_files: files.length,
                    reference: ui.mediaReference.value,
                    title: "",
                    name: "",
                    ext: "",
                };

                data = JSON.stringify(data);

                let formData = new FormData();
                for (const file of files) {
                    formData.append("file[]", file);
                }
                formData.append("controller", "MediaController");
                formData.append("action", "createMedia");
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

    ui.mediaFile.addEventListener('change', () => {
        method.fileChange()
    })

    ui.createMedia.addEventListener('click', () => {
        method.createMedia()
    })

}



const template = {
    title: `<div>view media</div>`,
    formCreateMedia: 
    `<div>
        <h5 class="h5">Ajouter un media</h5>
        <div class="row">
            <div class="col-12 formCreateMedia">
                <div class="form-group">
                    <label class="form-label">importer un fichier :</label>
                    <input type="file" name="media-file" data-field-type="file" multiple="multiple" class="form-control form-control-sm field-title">
                    <div class="feedback-file">Fichier non conforme</div>  
                </div>
                <div class="form-group">
                    <label>Reference</label>
                    <input type="text" data-field-type="text" name="reference" class="form-control form-control-sm" />
                </div>
                <button class="btn btn-primary btn-sm mt-3 createMedia">Enregistrer</button>
            </div>
        </div>
    </div>`
}


export {  initView };