import { PATH } from "../configUrl.js";

function switchModalAction(idModal, controller, action) {

    switch (controller) {
        case "drawAdmin":  
            switch (action) {
                case "deleteDraw":  
                console.log('on est ici')

                    let params = {
                        id: document.querySelector('[data-modal-id="'+idModal+'"] [data-item-id]').dataset.itemId
                    }
                    console.log(params)
                    fetchDelete(PATH.urlApi, params).then((json) => {
        
                        if (json.success) {
                            console.log('succes')

                        }
                    })
                    break;
                case "aa":
                    
                    break;
                default:
                    break;
            }
        break
        case "aaa":
         
            break;
        default:
            break;
    }
        
}