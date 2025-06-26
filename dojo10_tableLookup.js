/**
 * library: kintone JavaScript Client
 * CDN: https://js.cybozu.com/kintone-rest-api-client/5.6.0/KintoneRestAPIClient.min.js 
 */
(() => {
    'use strict'

    const events = [
        'app.record.edit.show',
        'app.record.create.show',
        'app.record.edit.change.マスタレコード番号',
        'app.record.edit.change.テーブル',
        'app.record.create.change.マスタレコード番号',
        'app.record.create.change.テーブル',

    ]
    const disableTable = (e) => {
        const table = e.record.テーブル.value

        table.forEach(row => {
            Object.keys(row.value).forEach(field => {
                row.value[field].disabled = true;
            })            
        });
    }
    const getLookupTable = async (e, recId) => {
        try {
            const appId = kintone.app.getLookupTargetAppId('企業検索')
            const res = new KintoneRestAPIClient()
            const body = {
                app: appId,
                id: recId
            }

            const lookupData = await res.record.getRecord(body)
            e.record.テーブル.value = lookupData.record.テーブル.value
            
            disableTable(e, false)
            kintone.app.record.set(e)
            //正常來說不可以在event.handler
        } catch (error) {
            console.error(error);
        }
    }
    kintone.events.on(events, e => {
        const { record, type } = e

        if (type.includes('マスタレコード番号')) {
            const lookupTargetRec = record.マスタレコード番号.value
            if (lookupTargetRec) { getLookupTable(e, lookupTargetRec) }
            record.テーブル.value = []
        }
        disableTable(e)
        return e
    })
})()
