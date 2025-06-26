(() => {
    'use strict'
    const events = [
        'app.record.create.change.radio',
        'app.record.edit.change.radio',
        'app.record.create.change.表格',
        'app.record.edit.change.表格',
        'app.record.create.show',
        'app.record.edit.show'
    ]
    kintone.events.on(events, e => {
        const { record } = e
        const table = record.表格.value
        table.forEach(row => {
            row.value.文字列.disabled = row.value.radio.value === '不可'
        });

        return e
    })

})()