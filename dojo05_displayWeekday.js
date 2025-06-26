/**
 * library: luxon
 * CDN: https://js.cybozu.com/luxon/3.0.4/luxon.min.js
 * 備註: day.js套件也可以實現相同效果
 */
(() =>{
    'use strict'
    const events = [
        `app.record.create.change.日期`,
        `app.record.edit.change.日期`,
        `app.record.create.show`,
        `app.record.edit.show`,
    ]
    kintone.events.on(events, e =>{
        const { record, type} = e
        record.Weekday.disabled = true;
        const fieldDate = e.record.日期.value
        const dr = luxon.DateTime.fromISO(fieldDate)
        const weekday = dr.setLocale('zh-TW').toFormat('EEEE')
        e.record.Weekday.value = weekday

        return e
    })
})()