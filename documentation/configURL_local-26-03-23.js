const PATH = {
    // dev (avant avoir depalcer le dossier uploads dans le dossier principal ,quand "upload etait a l'extérieur")
    // urlApi: "http://localhost/projet_web/api-starter/api-back/",
    // urlUploadImg: "http://localhost/projet_web/api-starter/uploads/",
    // dev (avant avoir depalcer le dossier uploads dans le dossier principal ,quand "upload etait a l'extérieur")
    urlApi: "http://localhost/projet_web/api-starter/api-dessin-v1/",
    urlUploadImg: "http://localhost/projet_web/api-starter/api-dessin-v1/uploads/",
    env_local: {
        urlApi: "http://localhost/projet_web/api-starter/api-dessin-v1/",
        urlUploadImg: "http://localhost/projet_web/api-starter/api-dessin-v1/uploads/",
    },
    env_prod: {
        urlApi: "http://api-dessin-v1.bqtu3021.odns.fr/",
        urlUploadImg: "http://api-dessin-v1.bqtu3021.odns.fr/uploads/"
    }
}

export { PATH };