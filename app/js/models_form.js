function getFieldTypeText(config) {

    const baseCls = {
        wrapper: {
            cls: ''
        },
        label: {
            cls: 'form-label'
        },
        field: {
            cls: 'form-control form-control-sm field-title'
        }
    }

    let html = `<div ${baseCls.wrapper.cls ? `class="${baseCls.wrapper.cls}"` : ''}>
                <label  ${config.label.for ? `for="${config.label.for}"` : ''}
                        ${baseCls.label.cls ? `class="${baseCls.label.cls}"` : ''}>
                        ${config.label.content ? `${config.label.content}` : ''}
                        </label>
                <input  ${config.field.type ? `type="${config.field.type}"` : ''} 
                        ${config.field.name ? `name="${config.field.name}"` : ''}
                        ${config.field.name ? `name="${config.field.name}"` : ''}
                        ${config.field.name ? `data-field-name="${config.field.name}"` : ''}
                        ${config.field.type? `data-field-type="${config.field.type}"` : ''}
                        ${config.field.value ? `value=${config.field.value}"` : ''}  
                        ${baseCls.field.cls ? `class="${baseCls.field.cls}"` : ''}
                    />

            </div>`

    return html
}

function getFieldTypeFileDraw(config) {

    const baseCls = {
        wrapper: {
            cls: ''
        },
        label: {
            cls: 'form-label'
        },
        field: {
            cls: 'form-control form-control-sm field-title'
        },
        error: {
            cls: ''
        }
        ,
        multiple: true
    }

    let html = `<div ${baseCls.wrapper.cls  ? `class="${baseCls.wrapper.cls}"` : ''}>
                <label ${config.label.for ? `for="${config.label.for}"` : ''}
                        ${baseCls.label.cls ? `class="${baseCls.label.cls}"` : ''}>
                        ${config.label.content ? `${config.label.content}` : ''}
                        </label>
                <input  ${config.field.type ? `type="${config.field.type}"` : ''} 
                        ${config.field.name ? `name="${config.field.name}"` : ''}
                        ${baseCls.multiple ? `multiple` : ''}
                        ${config.field.id ? `id="${config.field.id}"` : ''}
                        ${config.field.name ? `data-field-name="${config.field.name}"` : ''}
                        ${config.field.type ? `data-field-type="${config.field.type}"` : ''}
                        ${baseCls.field.cls ? `class="${baseCls.field.cls}"` : ''}
                        ${config.field.value ? `value=${config.field.value}"` : ''}  
                    />
                    <div  ${config.error.cls ? `class="${config.error.cls}"` : ''}>${config.error.content}</div>
            </div>`

    return html
}

function getFieldTypeCheckox(config) {

    const baseCls = {
        wrapper: {
            cls: 'form-check'
        },
        wrapper_checkbox: {
            cls: 'form-check'
        },
        label: {
            cls: 'form-check-label'
        },
        field: {
            cls: 'form-check-input'
        },
        error: {
            cls: ''
        }
    }

    let rows = '';

    config.lists.forEach(elt => {
        rows += `<div class="${baseCls.wrapper_checkbox.cls}" data-field-wrap-type="checkbox">
                    <input ${baseCls.field.cls ? `class="${baseCls.field.cls}"` : ''}
                        ${elt.type ? `type="${elt.type}"` : ''}
                        ${elt.name ? `name="${elt.name}"` : ''}
                        ${elt.name ? `data-field-name="${elt.name}"` : ''}
                        ${elt.value ? `value="${elt.value}"` : ''}
                        ${elt.value ? `data-field-value="${elt.value}"` : ''}
                        >
                    <label  ${baseCls.label.for ? `for="${baseCls.label.for}"` : ''}
                            ${baseCls.label.cls ? `class="${baseCls.label.cls}"` : ''}>
                            ${elt.label ? `${elt.label}` : ''}
                            </label>
                </div>`
    });

        

    let html = `<div data-field-wrap-type="checkbox" data-field-wrap-name="${config.container_name}">`
        html += `<legend>${config.wrapper.legend}</legend>`
        html += rows
        html += `</div>`

    return html
}

function getFieldTypeSubmit(config) {
    const baseCls = {
        container: {
            cls: 'mt-3'
        },
        button: {
            cls: 'btn btn-primary btn-sm'
        },

    }

    let html = `<div ${baseCls.container.cls ? `class="${baseCls.container.cls}"` : ''}>
                <button ${baseCls.button.cls ? `class="${baseCls.button.cls}"` : ''}
                        ${config.id ? `id="${config.id}"` : ''}
                        ${config.id ? `data-id-action="${config.id}"` : ''}>
                        ${config.text ? `${config.text}` : ''}
                        </button>
            </div>`

    return html
}

export { getFieldTypeText, getFieldTypeFileDraw, getFieldTypeCheckox, getFieldTypeSubmit };