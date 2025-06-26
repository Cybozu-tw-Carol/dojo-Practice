(() => {
    'use strict';

    const events = [
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.detail.show',
    ];
    const GroupCodes = [
        { code: 'English', language: 'en', isOpen: false },
        { code: 'Tradionnal_Chinese', language: 'zh-TW', isOpen: false },
        { code: 'Simplified_Chinese', language: 'zh', isOpen: false },

    ]
    kintone.events.on(events, (e) => {
        const loginLanguage = kintone.getLoginUser().language;
        console.log(`loginLanguage = ${loginLanguage} `);

        const matched = GroupCodes.some(code => loginLanguage === code.language)
        if (matched) {
            GroupCodes.forEach(code => {
                loginLanguage === code.language
                    ? code.isOpen = true
                    : code.isOpen
                console.log(code);

                kintone.app.record.setGroupFieldOpen(code.code, code.isOpen);
            })
        } else kintone.app.record.setGroupFieldOpen('English', true);
    })
})();