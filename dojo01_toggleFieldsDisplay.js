(() => {
    'use strict';

    const redioFieldCodes = ['製品序號有無', '生産状況'];

    // const fieldCodes = ['編號', '產品序號', '庫存'];
    const tableCode = '產品序列號明細';


    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        ...redioFieldCodes.flatMap(code => {
        return [`app.record.create.change.${code}`,
        `app.record.edit.change.${code}`]
        })

    ], (e) => {
        const record = e.record;
        const redioFieldValue = record[redioFieldCodes[0]].value;

        // fieldCodes.forEach((fieldCode)=>{
        //     if(redioFieldValue === '有'){
        //         kintone.app.record.setFieldShown(fieldCode, true);
        //         kintone.app.record.setFieldShown(fieldCode, true);
        //     }else{
        //         // kintone.app.record.setFieldShown(fieldCode, false);
        //         kintone.app.record.setFieldShown(fieldCode, false);
        //     }
        // })
        if(redioFieldValue === '有'){
                kintone.app.record.setFieldShown(tableCode, true);
            }else{
                // kintone.app.record.setFieldShown(fieldCode, false);
                kintone.app.record.setFieldShown(tableCode, false);
            }
        return e;
    })
})();