[![Codacy Badge](https://api.codacy.com/project/badge/Grade/db81bdaa90cc4b0491d6fcd4f4e7600b)](https://www.codacy.com/app/Team6083/OverObserver?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Team6083/OverObserver&amp;utm_campaign=Badge_Grade)
# OverObserver
提供團隊在FRC比賽時調查各隊資料
使用Google Firebase 架設
網站使用 Bootstrap, jQuery

## Getting Started

### 需求

* Git
* Node.js 與 npm
* Firebase CLI

### 安裝 Firebase CLI

注意: Firebase CLI 需要 Node.js 5.10.0 以上版本.
```
npm install -g firebase-tools
```

### 剩下的動作

* 下載專案資料

```
git clone https://github.com/Team6083/OverObserver.git
```
* 安裝其他需求套件
```
cd OverObserver/functions
npm install
```
* 登入 Firebase CLI
```
firebase login
```
接著會跳出一個瀏覽器視窗，在裡面登入即可

## 部署頁面

部署全部內容
```
firebase deploy -m <更新內容>
```
只部署Hosting內容
```
firebase deploy --only hosting -m <更新內容>
```

## 目前完成進度

* 2018/03/02  登入系統完成，TBA Get 完成測試
* 2018/03/18  登記系統全部完成，資料分析完成各隊最大、最小、平均值
* 2018/07/24  管理界面換新 新增使用者管理功能
* 2018/08/16  teamform更新，調查表單內容可以動態化
* 2019/02/28  更新動態表單lib
