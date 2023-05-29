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
        // class
        hideWhenIsClosed: options.hideWhenIsClosed ? 'hideWhenIsClosed' : ''
    }
    const ui = {
        target: `${state.target}`,
        close: `.drawer__close`,
        open: `.drawer__open`,
        content: `.drawer__content`,
        drawerUiid: `.drawer-${state.uiid}`
    }
    const method = {
        refreshContent: () => {
            // template.drawer = template.drawer
            document.querySelector(ui.content).innerHTML = state.content
        },
        open: () => {
            document.querySelector(ui.drawerUiid).classList.add('is_open')
        },
        close: () => {
            document.querySelector(ui.drawerUiid).classList.remove('is_open')
        },
        eventOpen: () => {
            document.querySelector(ui.open).addEventListener('click', () => {
                method.open()
            })
        },
        eventClose: () => {
            document.querySelector(ui.close).addEventListener('click', () => {
                method.close()
            })
        },
        render: () => {
            document.querySelector(ui.target).insertAdjacentHTML('beforeend', template.drawer)
            method.eventOpen()
            method.eventClose() 
        }
    }
    const template = {
        drawer: `<div class="component-drawer drawer-${state.uiid} ${state.hideWhenIsClosed}">
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