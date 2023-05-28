function ComponentDialog(options = {}) {
    
    const state = {
        target: options.target != undefined ? options.target : 'body',
        uiid: Date.now(),
        //
        title: options.title != undefined ? options.title : "",
        content: options.content != undefined ? options.content : "",
        action: options.action != undefined ? options.action : "",
        //
        width: options.width != undefined ? options.width : 600,
        height: options.height != undefined ? options.height : 500,
        top: "calc(" + (window.screen.height / 2) + 'px' + ' - ' + (options.height != undefined ? options.height : 500)+ "px",
        left: "calc(" + (window.screen.width / 2)  - (options.width != undefined ? options.width : 500) ,
        a: "calc(" + '100px' + "- 90px)",
    }
    const ui = {
        target: `${state.target}`,
        close: `.dialog__close`,
        dialogUiid: `.dialog-${state.uiid}`
    }
    const method = {
        open: () => {
            document.querySelector(ui.target).insertAdjacentHTML('beforeend', template.dialog)
            document.querySelector(ui.close).addEventListener('click', method.close)
        },
        close: () => {
            document.querySelector(ui.dialogUiid).remove()
        },
    }
    const template = {
        dialog: `<div class="component-dialog dialog-${state.uiid}">
                <div class="dialog__overlay"></div>
                <div class="dialog__contain" style="width:${state.width}px;height:${state.height}px;">
                    <div class="dialog__title">${state.title}<span class="dialog__close">fermer</span></div>
                    <div class="dialog__content">${state.content}</div>
                    <div class="dialog__action">${state.action}</div>
                </div>
            </div>`,
    }
    const setup = {
        state: state,
        ui: ui,
        method: method,
        template: template
    }

    return setup
}

export { ComponentDialog }