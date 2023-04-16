export function notificationAction(config = {}) {

    const options = {
        type: config.type != undefined ? config.type : 'loading',
        target: config.target != undefined ? config.target : '#main',
        msg: config.msg != undefined ? config.msg : '',
    }

    const ui = {
        target: `${options.target}`,
        notification: `.notification-action`,
        ok: `.notification-action__ok`
    }

    const method = {
        render: () => {
            let html = ``
            switch (options.type) {
                case 'loading':
                    html = template.loading
                    break;
                case 'confirmation':
                    html = template.confirmation
                    break;
                default:
                    break;
            }

            if (document.querySelector(ui.notification)) {
                document.querySelector(ui.target).removeChild(document.querySelector(ui.notification))
            }
            // document.querySelector(ui.target).appendChild(html)
            document.querySelector(ui.target).insertAdjacentHTML("beforeend", html);

            switch (options.type) {
                case 'loading':
                    setTimeout(() => {
                        document.querySelector(ui.target).removeChild(document.querySelector(ui.notification))
                    }, "1000")
                    break;
                case 'confirmation':
                    document.querySelector(ui.ok).addEventListener('click', () => {
                        document.querySelector(ui.target).removeChild(document.querySelector(ui.notification))
                    })
                    break;
                default:
                    break;
            }
        }
    }

    const template = {
        loading: `<div class="notification-action">
                    <div class="notification-action__overlay">
                        <div class="notification-action__content notification-action__content--loading">
                            <div>
                                loading ...
                            </div>
                        </div>
                    </div>
                </div>`,
        confirmation: `<div class="notification-action">
                <div class="notification-action__overlay">
                    <div class="notification-action__content">
                        <div class="notification-action__msg">
                            <div>${options.msg}</div>
                            <button class="notification-action__ok btn btn-primary btn-sm">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>`,
    }


    method.render()
}