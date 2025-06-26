/**
 * library: kintone JavaScript Client
 * CDN: https://js.cybozu.com/kintone-rest-api-client/5.6.0/KintoneRestAPIClient.min.js 
 */
(() => {
    'use strict'
    const res = new KintoneRestAPIClient()
    const isEditLogApp = 170

    kintone.events.on('app.record.edit.show', async event => {
        try {
            const loginUser = kintone.getLoginUser().code
            const { appId, recordId } = event
            const cancelBtn = document.getElementsByClassName('gaia-ui-actionmenu-cancel')[0]

            const editLog = await getRecord(appId, recordId)

            if (!editLog) {
                await addRecord(appId, recordId, loginUser)
            } else {
                const editingUser = editLog.user.value[0].code
                if (editingUser != loginUser) {
                    window.alert(`此紀錄目前已被${editingUser}編輯中`)
                    window.location.href = `https://hsiangting-tang.cybozu.com/k/${appId}/show#record=${recordId}`
                    return
                }
            }
            cancelBtn.addEventListener('click', async () => {
                const latestLog = await getRecord(appId, recordId);
                if (latestLog && latestLog.user.value[0].code === loginUser) {
                    await delRecord(latestLog.記錄號碼.value);
                }
            })
        } catch (error) {
            console.error('鎖定資料失敗', e);
        }

        return event
    })
    kintone.events.on('app.record.edit.submit', async event => {
        try {
            const { appId, recordId } = event
            const editLog = await getRecord(appId, recordId)
            if (editLog) {
                await delRecord(editLog.記錄號碼.value)
            }
        } catch (error) {
            console.error('取消鎖定資料失敗', e);
        }
        return event
    })
    window.addEventListener('beforeunload', async () => listnerDelRecord())

    const listnerDelRecord = () => {
        try {
            const record = kintone.app.record.get();
            const id = record.record.記錄號碼.value;
            const appId = kintone.app.getId();
            const loginUser = kintone.getLoginUser().code;

            getRecord(appId, id).then((editLog) => {
                if (editLog && editLog.user.value[0].code === loginUser) {
                    delRecord(editLog.記錄號碼.value);
                }
            });
        } catch (error) {
            console.warn('beforeunload 解鎖失敗', error);
        }

    };
    const getRecord = async (appId, recordId) => {
        const query = `app_id = "${appId}" and record_id = "${recordId}" order by 記錄號碼 asc limit 1`
        const getBody = {
            app: isEditLogApp,
            query: query
        }
        const response = await res.record.getRecords(getBody)
        return response.records[0] || null

    }
    const addRecord = async (appId, recordId, loginUser) => {
        const postBody = {
            app: isEditLogApp,
            records: [
                {
                    record_id: {
                        value: recordId
                    },
                    app_id: {
                        value: appId
                    },
                    user: {
                        value: [{ code: loginUser }]
                    }
                }
            ]
        }
        await res.record.addRecords(postBody)
    }
    const delRecord = async (recordId) => {
        const delBody = {
            app: isEditLogApp,
            ids: [recordId]
        }
        await res.record.deleteRecords(delBody)
    }
})()

