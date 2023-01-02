/**
 * 
 * @param {object} // type return // selector wrap - selector field type
 * @returns 
 */
function getValuesFieldText(config) {

    let errorsConfig = 0
    errorsConfig = config.wrapper == undefined ? 1 : 0
    errorsConfig = config.field == undefined ? 1 : 0
    errorsConfig = config.format == undefined ? 1 : 0

    if (errorsConfig > 0) {
        return []
    } 
    
    let wrap = document.querySelector(config.wrapper)
    let fields = wrap.querySelectorAll(config.field)
    let result;

    if (config.format == 'arrayOfObject') {
        result = []

        fields.forEach(elt => {
            let obj = {}
            obj[elt.dataset.fieldName] = elt.value
            result.push(obj)
        })

    } else if (config.format == 'objectOfValue') {
        result = {}
        fields.forEach(elt => {
            let obj = {}
            obj[elt.dataset.fieldName] = elt.value

            Object.assign(result, obj)
        })
    }

    return result
}

/**
 * 
 * @param {string} wrapSelectorName 
 * @param {string} fieldSelectorName 
 * @returns 
 */
function getValuesFieldCheckbox(config) {

    let errorsConfig = 0
    errorsConfig = config.wrapper == undefined ? 1 : 0
    errorsConfig = config.field == undefined ? 1 : 0
    errorsConfig = config.format == undefined ? 1 : 0

    if (errorsConfig > 0) {
        return []
    } 

    let wrap = document.querySelector(config.wrapper)
    let wrapFieldCheckbox = wrap.querySelectorAll(config.field)
    let result;
    let checkList;


    if (config.format == 'arrayOfObject') {

        result = []

        wrapFieldCheckbox.forEach(elt => {
    
            let wrapCheckboxName = elt.dataset.fieldWrapName
            let checkbox = elt.querySelectorAll('[type="checkbox"]')
    
            checkList = []
    
            checkbox.forEach(item => {
                if (item.checked == true) {
                    checkList.push(item.value)
                }
            })
    
            let obj = {}
            obj[wrapCheckboxName] = checkList
            result.push(obj)
    
        })
    }

    if (config.format == 'objectOfValue') {

        result = {}

        wrapFieldCheckbox.forEach(elt => {
    
            let wrapCheckboxName = elt.dataset.fieldWrapName
            let checkbox = elt.querySelectorAll('[type="checkbox"]')
    
            checkList = []
   
            checkbox.forEach(item => {
                if (item.checked == true) {
                    console.log(item)
                    checkList.push(item.value)
                }
            })
    
            let obj = {}
            obj[wrapCheckboxName] = checkList
            // result.push(obj)

            Object.assign(result, obj)
    
        })
    }

    return result
}

function bonjour() {
    console.log('bonjour bonjour bonjour')
}


export { getValuesFieldText, getValuesFieldCheckbox, bonjour };