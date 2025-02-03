# GunFight Arena

**GunFight Arena** 是一款 Minecraft Bedrock Edition 上的槍戰遊戲模組，支援多人遊玩，並提供多種模式。

## 📦 安裝 & 使用

### 1️⃣ 安裝

1. 在 **Releases** 尋找對應的版本，並下載 `.mcworld` 檔案。
2. 打開 `.mcworld` 檔案導入遊戲，並導入到至遊玩世界。
3. 確保該世界有開啟 **實驗性功能**

### 2️⃣ 使用

```
/function join_queue # 加入遊戲
/function left_queue # 離開遊戲
/function game_start # 開始遊戲
```

## 🎮遊戲玩法

### **Demolition（爆破模式）**

- **遊戲規則**：
    - 玩家分為 **紅隊（進攻方）** 和 **藍隊（防守方）**。
    - 進攻方的目標是安裝炸彈，防守方則必須阻止並拆除炸彈。
    - 若炸彈成功引爆或所有防守方玩家被淘汰，則紅隊獲勝；反之，藍隊獲勝。

- **操作方式**：
    - 回合前的準備階段，`右鍵` 背包中的**羽毛**能夠開啟商店。
    - 槍械等道具的使用方法請參考原出處。

## 📜 貢獻

**👤Author**: [@xigma0512](https://github.com/xigma0512) \
**🎨AplokGun Addon**: [Aplok Guns](https://mcpedl.com/aplok-guns/), developed by [@GabrielAplok](https://github.com/gabriel-aplok/)\
**🌍Map**: [CS:GO Dust II](https://mcpedl.com/cs-s-dust-ii/) Creating by @Codre & Porting by @AzozGamer936

## 🏛️ License
This project is licensed under the MIT License. See the LICENSE file for details.

## 📌 TODO
- [x] 隱藏玩家名牌
- [x] 裝包/拆包
- [ ] 自定義觀察者 (可飛行但不可穿牆)
- [x] 自定義擊殺訊息 (ex. `[RED] Steve KILL [BLUE] Alex`)
- [ ] 增加更多聲音/提示/粒子效果，給予玩家遊戲內的必要資訊 (ex. 炸彈包音效、移動時的腳步聲)
- [ ] 顯示目前存活玩家
- [ ] 遊戲回合數過半，攻守交換
- [ ] 新增煙霧彈
- [ ] 開放自訂設定，可以自行選擇地圖
- [ ] 遊戲戰績紀錄
- [ ] 新增更多模式
- [ ] 為商店的選項增加圖片
- [ ] 經濟系統，用來購買槍枝或道具

## 🛠️ 已知問題
- [x] 炸彈包會受到子彈/爆炸傷害
- [x] 炸彈包會飄浮在空中
- [x] 裝包後，全隊死亡後不會進入結算
- [x] 攜帶炸彈包的人死亡，炸彈包不會掉落
- [ ] 防守方的玩家可以撿起炸彈包
- [ ] 回合結束後，掉落在地上的炸彈包不會消失
- [ ] 炸彈包的Boss bar顯示距離不夠遠，導致有些時候看不到炸彈包