async function fetchMedias(url, params) {

    // let params = {"ids":['98', '99']}
    // let params = {"ids":['98', '99']}
    let data = {
       "controller": "MediaController",
       "action": "getMedias",
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

export { fetchMedias }; 