/**
 * library: kintone JavaScript Client, kintone UI Component v1
 * CDN: https://js.cybozu.com/kintone-rest-api-client/5.6.0/KintoneRestAPIClient.min.js 
 *      https://unpkg.com/kintone-ui-component/umd/kuc.min.js
*/

(() => {
    'use strict'

    const events = [
        'app.record.detail.show',
    ]
    kintone.events.on(events, event => {
        const { record, type } = event
        console.log(record);

        if (record.flag.value != "1") {
            const btn = new Kuc.Button({
                text: '投稿',
                type: 'submit'
            })
            kintone.app.record.getSpaceElement('btn').appendChild(btn)
            const url = record.url.value
            const match = url.match(/space\/(\d+)\/thread\/(\d+)/)
            const msg = record.memo.value

            if (msg && match) {
                btn.addEventListener('click', async () => {
                    const res = new KintoneRestAPIClient()
                    try {
                        const body = {
                            space: Number(match[1]),
                            thread: Number(match[2]),
                            comment: {
                                text: msg
                            }
                        }
                        const updateFlag = {
                            app: event.appId,
                            id: event.recordId,
                            record: {
                                flag: {
                                    value: 1
                                }
                            }
                        }
                        await res.space.addThreadComment(body)
                        window.alert('投稿成功, 將重新刷新頁面')
                        await res.record.updateRecord(updateFlag);
                        location.reload();

                        return event
                    } catch (error) {
                        console.error(error);
                        window.alert(error)

                    }
                })
            }
        }
    })
})()