# dojo-Practice

## 🛠️ 使用技術

- Kintone JavaScript API
- Kintone REST API Client (`@kintone/rest-api-client`)
- [Kintone UI Component (KUC)](https://kintone.dev/en/docs/kintone-ui-component/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Luxon](https://moment.github.io/luxon/#/)
- [Popper](https://popper.js.org/docs/v2/)
- [Tippy](https://atomiks.github.io/tippyjs/)

---

## 📁 練習內容說明

| 練習檔案名稱         | 功能說明 |
|------------------|----------|
| `dojo01_toggleFieldsDisplay.js`   | 當記錄的「建立紀錄」、「編輯紀錄」或「詳細紀錄」顯示時，會根據單選按鈕（Radio Button）的選取值，自動切換特定欄位的顯示或隱藏狀態。 |
| `dojo02_toggleGroupField.js`  | 當記錄的「詳細紀錄」、「建立紀錄」或「編輯紀錄」顯示時，會根據登入使用者的身分，自動控制群組欄位的開啟或關閉狀態。 |
| `dojo03_toggleEditable.js` | 當「刪除許可標記」未被勾選時，禁止使用者在一覽紀錄中刪除該筆紀錄。 |
| `dojo04_portaldisplay.js` | 在 Kintone 的入口頁面（Portal）實作一個自訂畫面，手動排入約 5 個應用程式的圖示，作為快速連結使用。圖示與連結資訊採用靜態寫死方式配置。|
| `dojo05_displayWeekday.js` | 當記錄的「一覽紀錄」、「建立紀錄」或「編輯紀錄」顯示時，「日期」欄位的值變更時，自動在「星期」欄位顯示對應的星期幾。 |
| `dojo06_tableConsolidate.js` | 透過子表格中的資料自動計算各項目的合計件數。 |
| `dojo07_toolTip.js` | 在建立紀錄時，於欄位旁加入一個空間欄位，當滑鼠移至該處時顯示補充說明的提示文字（Tooltip）。 |
| `dojo08_toggleTableField.js` | 當「建立紀錄」或「編輯紀錄」顯示時，根據「單選按鈕（radio）」欄位的值，動態控制同一列上的「文字列（1行）」欄位是否可編輯。|
| `dojo09_pushProccess.js` | 當「建立紀錄儲存成功」時，自動將流程管理推進至第一個流程步驟。 |
| `dojo10_tableLookup.js` | 顯示關聯查詢（Lookup）來源表格中的資料內容。 |
| `dojo11_postThread.js` | 在記錄詳細畫面新增一個「投稿」按鈕，點擊後會將該筆記錄的內容發佈到指定的討論串中。 |
| `dojo12_isHoliday.js` | 當日期欄位的值變更時，根據台灣政府行政機關的辦公日曆資料，判斷該日期是否為國定假日並顯示結果。 |
| `dojo13_userEditAlert.js` | 當打開記錄編輯畫面時，若該記錄正被其他使用者編輯，會跳出警示提醒使用者。 |
| `dojo14_fieldLookup.js` | 根據使用者指定的「社員番号」與「年度」欄位值，自動查詢並帶入符合條件的「予算番号」，實現依條件篩選的自訂聯動查詢功能。 |

---
