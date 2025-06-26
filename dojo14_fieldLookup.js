/**
 * library:
 *  kintone JavaScript Client, 
 *  kintone UI Component v1,
 *  sweetalert2
 * CDN: 
 *      https://js.cybozu.com/kintone-rest-api-client/5.6.0/KintoneRestAPIClient.min.js 
 *      https://unpkg.com/kintone-ui-component/umd/kuc.min.js
 *      https://js.cybozu.com/sweetalert2/v11.22.0/sweetalert2.min.js
*/
(() => {
    'use strict'
    const res = new KintoneRestAPIClient()

    kintone.events.on('app.record.create.show', async event => {
        const { record } = event
        const user = kintone.getLoginUser().code;
        const getBody = {
            app: 171,
            query: `ユーザー選択 in ("${user}") limit 1`
        }
        const data = await res.record.getRecords(getBody)

        if (data.records.length === 0) {
            showAlert('查無資料', '沒有查詢到該員工資訊');
        } else {
            record.社員番号.value = data.records[0].社員番号.value
            record.社員番号.lookup = true
            createBtn()
        }

        return event
    })


    const createBtn = () => {
        const btn = new Kuc.Button({
            text: '選擇預算',
            type: 'submit',
            className: 'options-class',
            id: 'budget_btn-id',
            visible: true,
            disabled: false
        });
        const spaceId = kintone.app.record.getSpaceElement('budget')
        btn.onclick = searchData;
        spaceId.appendChild(btn)
    }

    const searchData = async () => {
        const rec = kintone.app.record.get()
        const year = rec.record.年度.value
        const dep = rec.record.所属部署.value
        const getBody = {
            app: 172,
            query: `本部 = "${dep}" and 年度 in ("${year}")`
        }
        if (!year) {
            showAlert('查無資料', '請填入年度')
            return
        }
        const data = await res.record.getRecords(getBody)
        const tableHTML = makeTable(data.records)

        showTable(tableHTML);
    }
    const makeTable = (datas) => {
        let tbody = ``
        datas.forEach(data => {
            tbody += `
            <tr>
                <td>${data.予算番号.value}</td>
                <td>${data.内容.value}</td>
                <td>${data.予算.value}</td>
                <td><button class="budgetBtn" value="${data.予算番号.value}">選擇</button></td>
            </tr>`
        });

        const html = `
        <table width="100%" border="1">
            <thead>
                <tr>
                    <th>予算番号</th>
                    <th>内容</th>
                    <th>予算</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>${tbody}</tbody>
        </table>`

        return html
    }
    const showTable = (tableHTML) => {
        Swal.fire({
            title: '年度預算',
            html: tableHTML,
            showConfirmButton: false,
            showCloseButton: true,
            didOpen: () => {
                BudgetBtnEvents()
            }
        })
    }

    const BudgetBtnEvents = () => {
        document.querySelectorAll('.budgetBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tr = e.target.closest('tr')
                const tds = tr.querySelectorAll('td')
                const budgetNum = tds[0].textContent
                const content = tds[1].textContent
                const budget = tds[2].textContent
                const rec = kintone.app.record.get();

                rec.record.予算番号.value = budgetNum;
                rec.record.内容.value = content;
                rec.record.申請金額.value = budget;
                kintone.app.record.set(rec);

                Swal.close();
            })
        })
    }
    const showAlert = (title, text, icon = 'info') => {
        return Swal.fire({ title, text, icon, confirmButtonText: '確認' })
    }

})()