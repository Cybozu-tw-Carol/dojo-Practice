/**
 * library: kintone JavaScript Client
 * CDN: https://js.cybozu.com/kintone-rest-api-client/5.6.0/KintoneRestAPIClient.min.js 
 */

(() => {
    'use stirct'

    kintone.events.on('app.record.create.submit.success', async e => {
        try {
            const body = {
                app: e.appId,
                id: e.recordId,
                action:'申请',
                assignee: e.record.ユーザー選択.value[0].code
            }
            const res = new KintoneRestAPIClient()
            await res.record.updateRecordStatus(body)
            
            return e
        } catch (error) {
            console.error(error);
            
        }

    })
})()