(() => {
    'use strict'

    const fieldCode = '狀態'
    const events = [
        'app.record.edit.submit',
        'app.record.detail.delete.submit',
        'app.record.index.delete.submit'
    ]
    kintone.events.on(events, e => {
        const { record, type } = e
        const loginUser = kintone.getLoginUser()
        console.log('type = ' + type);

        switch (type) {
            case 'app.record.index.delete.submit':
            case 'app.record.detail.delete.submit':
                if (record.狀態.value === '完成') {
                    console.log('type = ' + type);
                    e.error = '已完成批准的訂單不可以被刪除'
                }
                break
            case 'app.record.edit.submit':
                console.log('app.record.edit.submit')

                if (record.狀態.value === '完成' && loginUser.code != 'Administrator') {

                    e.error = '已完成訂單不可以再次被編輯'
                }
                break
        }
        return e
    })

})();