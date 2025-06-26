/**
 * library: popper, tippy
 * CDN: https://unpkg.com/popper.js
 *      https://unpkg.com/tippy.js@5
 */
(() =>{
    'use strict'
    const events = [
        'app.record.create.show',
        'app.record.edit.show',
    ]

    const showTippy = (spaceid, msg) => {
        const element = document.createElement('i')
        element.className = 'fa fa-question-circle'
        tippy(element, {
            content: msg
        })
        kintone.app.record.getSpaceElement(spaceid).appendChild(element)
    }
    kintone.events.on(events, e => {

        showTippy('name', '輸入名字')
        showTippy('age', '輸入年齡')
        return e
    })
})()