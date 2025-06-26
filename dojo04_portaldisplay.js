(() => {
    'use strict'

    const events = [
        'portal.show',
    ]
    /**
     * TODO: 目前功能只顯示固定ＡＰＰ，後續應更改成能由管理人員或是各User客製化設計之portal
     */
    kintone.events.on(events, e => {
        const appList = [
            { name: 'Invoice', url: 'https://hsiangting-tang.cybozu.com/k/135/', img: 'https://icone.unique-work.com/images/icon/krm/error.svg' },
            { name: '銷售紀錄', url: 'https://hsiangting-tang.cybozu.com/k/85/', img: 'https://icone.unique-work.com/images/icon/ti/pc.svg' },
            { name: '發貨單', url: 'https://hsiangting-tang.cybozu.com/k/93/', img: 'https://icone.unique-work.com/images/icon/ti/folder.svg' },
            { name: 'Payment', url: 'https://hsiangting-tang.cybozu.com/k/136/', img: 'https://icone.unique-work.com/images/icon/krm/usb.svg' },
        ]
        const element = kintone.portal.getContentSpaceElement()
        const div = document.createElement('div')

        let printData = ``
        appList.forEach(item => {
            printData += `
            <a class="app-item" href=${item.url}>
            <img class="portal_icon_img" src=${item.img}>
            <div>
                <h3>${item.name}</h3>
            </div>
            </a>`
        })
        const innerText = `
            <div class="container">
                <h2 class="title">常用APP一覽</h2>
                <div id="app_list" class="flex-item">
                ${printData}
                </div>
            </div>`
        div.className = 'main'
        div.innerHTML = innerText
        element.appendChild(div)
    })
})()