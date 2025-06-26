(() => {
    'use strict'

    const changeFields = {
        車禍種類: '車禍種類',
        件數: '件數',
        分類: ['人対車両', '車両相互', '車両単独'],
        地區: ['台北', '台南', '新竹'],
    }
    const changeEvents = Object.keys(changeFields).flatMap(code => {
        return [`app.record.create.change.${code}`, `app.record.edit.change.${code}`]
    })

    const events = [
        'app.record.create.show',
        'app.record.edit.show',
        ...changeEvents
    ]

    const setValue = (record, key, targetField) => {
        const table = record.車禍種類.value
        const data = table.reduce((acc, cur) => {
            const target = cur.value[key].value;
            const count = Number(cur.value.件數.value);

            acc[target] = (acc[target] || 0) + count

            return acc
        }, {})
        console.log(data);

        targetField.forEach(field => {
            console.log(field);

            if (data[field] !== undefined) {
                record[field].value = data[field];
            } else {
                record[field].value = '';
            }
        })
        return data
    }

    kintone.events.on(events, e => {
        const { record, type } = e
        console.log(type);

        ['分類', '地區'].forEach(type => {
            (changeFields[type] || []).forEach(field => {
                record[field].disabled = true;
            });
        });

        if (type.includes('change')) {
            setValue(record, '地區', changeFields['地區'])
            setValue(record, '分類', changeFields['分類'])
        }

        return e
    })
})()
