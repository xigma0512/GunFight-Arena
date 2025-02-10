# GunFight Arena

[**中文** | [English](README_en.md)]

## ℹ️ 資訊

**GunFight Arena** 是一款 Minecraft Bedrock Edition 上的槍戰遊戲模組，支援多人遊玩，並提供多種模式。

> [!IMPORTANT]
> 該版本在之後不會再有大更新，我會開始著手設計第二版，最主要的改變內容有：
> 
> 1. 更有條理的程式架構
> 2. 自己設計的槍枝系統和 UI 介面
>
> 這將會是一個很長遠的計畫，希望能夠將這份專案延續下去。

## 📦 安裝 & 使用

### 1️⃣ 安裝

1. 在 **Releases** 尋找對應的版本，並下載 `.mcworld` 檔案。
2. 打開 `.mcworld` 檔案導入遊戲，並導入到至遊玩世界。
3. 確保該世界有開啟 **實驗性功能 - Beta API**

> [!WARNING]
> 當前版本還未推出自定義地圖的功能。不過您可以編輯 `src/config.ts` 的內容，透過變更裡面的資訊並安裝到其他地圖，照理來說是可以運作的。\
> 如果有需要，我會在之後附上 `config` 內容的註解。 

### 2️⃣ 使用

```
/function gf/join      # 加入遊戲
/function gf/left      # 離開遊戲
/function gf/gamestart # 開始遊戲
```

## 🎮遊戲玩法

### **Demolition（爆破模式）**

- **遊戲規則**：
    - 玩家分為 **紅隊（進攻方）** 和 **藍隊（防守方）**。
    - 進攻方的目標是安裝炸彈，防守方則必須阻止並拆除炸彈。
    - 若炸彈成功引爆或所有防守方玩家被淘汰，則紅隊獲勝；反之，藍隊獲勝。
    - 遊戲在回合總數過半時，會進行攻守交換。

- **操作方式**：
    - 回合前的準備階段，`右鍵` 背包中的**羽毛**能夠開啟商店。
    - 手持炸彈包，按住 `右鍵` 可以安裝炸彈包。手持剪線鉗，按住 `右鍵`可以拆除炸彈包。
    - 手持武器時: \
        a. `蹲下` 可以進入瞄準狀態\
        b. 按下 `右鍵` 可以射擊\
        c. `蹲下` + `左鍵` 可以安裝子彈

## 📜 貢獻

**👤Author**: [@xigma0512](https://github.com/xigma0512) \
**🎨AplokGun Addon**: [Aplok Guns](https://mcpedl.com/aplok-guns/), developed by [@GabrielAplok](https://github.com/gabriel-aplok/)\
**⭐Personal Sidebar Scoreboard**: [@MonkeyChan](https://www.youtube.com/@MonkeyChan118 )

## 🏛️ License
This project is licensed under the MIT License. See the LICENSE file for details.

## 📌 TODO
- [ ] 開放自訂設定，可以自行選擇地圖
- [ ] 遊戲戰績紀錄

## 🛠️ 已知問題
- [ ] 炸彈包的Boss bar顯示距離不夠遠，導致有些時候看不到炸彈包