function ComponentDrawer(options = {}) {
    
    const state = {
        target: options.target != undefined ? options.target : 'body',
        uiid: Date.now(),
        //
        content: options.content != undefined ? options.content : "",
        action: options.action != undefined ? options.action : "",
        //
        width: options.width != undefined ? options.width : 20,
        // height: options.height != undefined ? options.height : 20,
    }
    const ui = {
        target: `${state.target}`,
        close: `.drawer__close`,
        open: `.drawer__open`,
        drawerUiid: `.drawer-${state.uiid}`
    }
    const method = {
        open: () => {
            document.querySelector(ui.open).addEventListener('click', () => {
                console.log('open')
                document.querySelector(ui.drawerUiid).classList.add('is_open')
            })
        },
        close: () => {
            document.querySelector(ui.close).addEventListener('click', () => {
                console.log('close')
                document.querySelector(ui.drawerUiid).classList.remove('is_open')
            })
            

        },
        render: () => {
            document.querySelector(ui.target).insertAdjacentHTML('beforeend', template.drawer)
            method.open()
            method.close()
        }
    }
    const template = {
        drawer: `<div class="component-drawer drawer-${state.uiid}">
                <div class="drawer__overlay"></div>
                <div class="drawer__action">
                    <span class="drawer__open">Ouvrir</span>
                    <span class="drawer__close">fermer</span>
                </div>
                <div class="drawer__content">${state.content}</div>

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

export { ComponentDrawer }