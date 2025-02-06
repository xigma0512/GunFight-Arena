# GunFight Arena  

[[中文](README.md) | **English**]

> [!WARNING]
> This English version was written using translation software. Please understand if there are any inaccuracies. 

> [!NOTE]  
> Minecraft Version: `1.21.51`  
> Addon Version: `v1.0-beta.1`  

**GunFight Arena** is a gunfight game mod for Minecraft Bedrock Edition. It supports multiplayer gameplay and offers multiple game modes.  

## 📦 Installation & Usage  

### 1️⃣ Installation  

1. Find the corresponding version in **Releases** and download the `.mcworld` file.  
2. Open the `.mcworld` file to import it into the game.  
3. Ensure that **Experimental Features** are enabled in the world settings. 

> [!WARNING]  
> The current version does not yet support custom maps. However, you can edit the contents of `src/config.ts` and install it on another map by modifying the information inside. In theory, it should work.  \  
> If needed, I will provide annotations for the `config` contents in the future.  

### 2️⃣ Usage  

```
/function join_queue # Join the game  
/function left_queue # Leave the game  
/function game_start # Start the game  
```  

## 🎮 Gameplay  

### **Demolition Mode**  

- **Game Rules**:  
    - Players are divided into **Red Team (Attackers)** and **Blue Team (Defenders)**.  
    - The Attackers' objective is to plant the bomb, while the Defenders must prevent and defuse it.  
    - If the bomb successfully explodes or all Defenders are eliminated, the Red Team wins; otherwise, the Blue Team wins.  

- **How to Play**:  
    - During the preparation phase before each round, `Right-click` the **Feather** in your inventory to open the shop.  
    - Refer to the original addon documentation for weapon usage.  

## 📜 Contributions  

**👤 Author**: [@xigma0512](https://github.com/xigma0512)  
**🎨 AplokGun Addon**: [Aplok Guns](https://mcpedl.com/aplok-guns/), developed by [@GabrielAplok](https://github.com/gabriel-aplok/)  
**🌍 Map**: [CS:GO Dust II](https://mcpedl.com/cs-s-dust-ii/) Created by @Codre & Ported by @AzozGamer936  

## 🏛️ License  
This project is licensed under the MIT License. See the LICENSE file for details.  

## 📌 TODO  
- [x] Hide player nametags  
- [x] Plant/Defuse bomb system  
- [ ] Custom spectator mode (can fly but cannot pass through walls)  
- [x] Custom kill messages (e.g., `[RED] Steve KILL [BLUE] Alex`)  
- [ ] Add more sounds/indicators/particle effects for important game events (e.g., bomb ticking sounds, footstep sounds)  
- [ ] Display remaining alive players  
- [ ] Switch teams at halftime  
- [ ] Add smoke grenades  
- [ ] Allow custom map selection  
- [ ] Implement game statistics tracking  
- [ ] Add more game modes  
- [ ] Add images for shop options  
- [ ] Implement an economy system for purchasing weapons and items  

## 🛠️ Known Issues  
- [x] The bomb package can be damaged by bullets/explosions  
- [x] The bomb package may float in the air  
- [x] If all players die after planting the bomb, the round does not end properly  
- [x] The bomb does not drop when the carrier dies  
- [x] Defenders can pick up the bomb package  
- [x] The bomb package does not disappear after the round ends  
- [ ] The bomb's boss bar visibility range is too short, making it difficult to locate sometimes  