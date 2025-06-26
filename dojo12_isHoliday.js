(() => {
    'use strict'

    const events = [
        'app.record.create.change.日期',
        'app.record.edit.change.日期',
        'app.record.create.show',
        'app.record.edit.show',
    ]
    let holiday = []

    kintone.events.on(events, event => {
        const { record, type } = event
        const date = record.日期.value.split('-').join('')
        if (!type.includes('change')) getHoliday(record)

        const found = holiday.find(item => item.date === date)

        if (found != undefined) {
            found.caption === ''
                ? record.日期.error = '這是假日'
                : record.日期.error = `這是國定假日${found.caption}`
        } else {
            record.日期.error  = null;
        }

        return event

    })

    const getHoliday = async (record) => {
        const [year, month, day] = record.日期.value.split('-')
        const api = `https://api.pin-yi.me/taiwan-calendar/${year}/?isHoliday=true`

        try {
            const res = await fetch(api).then(res => res.json()).then(data => { return data })
            res.forEach(element => {
                holiday.push({ date: element.date, caption: element.caption })
            });
            return holiday
        } catch (error) {
            return null;
        }
    }
})()