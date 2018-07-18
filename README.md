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

注意: 安裝Firebase CLI之前，需要先安裝 Node.js 與 npm
```
npm install -g firebase-tools
```
這樣就準備好啦

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

## 目前完成進度

* 2018/03/02  登入系統完成，TBA Get 完成測試
* 2018/03/18  登記系統全部完成，資料分析完成各隊最大、最小、平均值
