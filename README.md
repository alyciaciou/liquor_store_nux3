# 🥂 Liquor Store - Nuxt 3

品味生活，享受人生。  
以 **Nuxt 3** 打造的響應式酒類電商前端網站，整合多項現代化工具與 API 互動，支援 **靜態網站生成（SSG）**，可輕鬆部署至 **GitHub Pages** 或 **Render**。

---

## 🔗 Demo 網站

- GitHub Pages：🔗 https://alyciaciou.github.io/liquor_store_nux3/
- Render：🔗 https://liquor-store-nux3.onrender.com/

---

## ✨ 功能介紹

* 商品列表分類（支援條件篩選）
* 加入購物車（支援數量調整與刪除）
* 表單驗證與訂單送出（使用 VeeValidate）
* Swiper 套件製作輪播區塊
* Pinia 管理購物車資料與商品狀態
* 串接 API：取得商品清單與送出訂單資訊

---

## 🖼️ 頁面截圖

### 首頁範例
![首頁畫面](https://github.com/alyciaciou/liquor_store_nux3/blob/main/public/images/alyciaciou.github.io_liquor_store_homepage.png?raw=true)

---

## 🧩 技術架構與工具

* Nuxt 3：基於 Vue 3，支援自動路由與靜態產生（SSG）
* TypeScript：API 層、Pinia 與主要頁面
* Tailwind CSS：快速打造一致的響應式 UI 設計
* Pinia：狀態管理工具，集中管理購物車與商品資料
* VeeValidate：表單驗證
* Axios：串接第三方 API 實現即時資料互動
* Vue Router：由 Nuxt 內建路由功能，自動建立 pages 對應路徑
* SweetAlert2：美觀的彈跳視窗
* Swiper：製作首頁圖片輪播
---

## ⚙️ 安裝與開發

### 安裝套件

```bash
npm install

```

## 啟動本地開發伺服器

```bash
npm run dev
# 開啟瀏覽器 http://localhost:3000

```

## 部署與靜態產出（SSG）

```bash
npm run generate
# 用於部署到 Render

npm run generate:gh
# 用於部署到 GitHub Pages（base URL 不同）
```

## 注意事項

* 本作品純屬個人前端練習用，所使用圖片與資料皆無任何商業用途
* 所有 API 為第三方提供，僅用於學習與介面展示


