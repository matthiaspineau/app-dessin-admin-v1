async function fetchDataFormAddDraw(url) {

    const req = await fetch(url)

    if (req.ok === true) {
        return req.json()
    }
    
    throw new Error('Dock, erreur requete pour la récupération des élément du formulaire "add Draw"')
} 

async function fetchGetTableDraw(url, params) {

    let data = {
       "controller": "MediaController",
       "action": "getMediaCollection",
       "params":  JSON.stringify(params),
    }
    data = JSON.stringify(data)

    const req = await fetch(url ,{
        method: 'POST',
        headers: {
            "Accept": "application/json",
        },
        body: data
    })
    if (req.ok === true) {

        return req.json()
    }
    throw new Error('nouvelle erreur lors de la creation')
}

async function fetchGetDraw(url, params) {

    // let params = {"id":['98', '99']}
    // let params = {"id":['98', '99']}
    let data = {
       "controller": "DrawingController",
       "action": "getDraw",
       "params":  JSON.stringify(params),
    }
    data = JSON.stringify(data)

    const req = await fetch(url ,{
        method: 'POST',
        headers: {
            "Accept": "application/json",
        },
        body: data
    })

    if (req.ok === true) {
        return req.json()
    }
    throw new Error('nouvelle erreur lors de la creation')
}

async function fetchDelete(url, item) {

    let params = {"id": item.id, "name": item.name}

    let data = {
       "controller": "DrawingController",
       "action": "deleteDraw",
       "params":  JSON.stringify(params),
    }
    data = JSON.stringify(data)

    const req = await fetch(url ,{
        method: 'POST',
        headers: {
            "Accept": "application/json",
        },
        body: data
    })
    
    if (req.ok === true) {
        return req.json()
    }
    throw new Error('nouvelle erreur lors de la creation')
}


export { fetchDataFormAddDraw, fetchGetTableDraw, fetchDelete, fetchGetDraw };
