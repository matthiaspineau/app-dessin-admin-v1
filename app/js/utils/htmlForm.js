import { PATH } from "../../configUrl.js";

export function renderOptionsGroupsMedia() {

    const method = {
        createOptionsGroupsMedia: () => {

            let options = '<option id="0">Chosir une référence</option>'
            method.fetchMediaGroupForSelectOptions().then((json) => {
                json.data.forEach(elt => {
                    options += `<option value="${elt.id}">${elt.reference} (${elt.id})</option>`
                })

                return options
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
    }
    console.log(method.createOptionsGroupsMedia())
    const options = method.createOptionsGroupsMedia()
    return 'a'

}