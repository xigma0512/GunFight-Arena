# GunFight Arena

[**中文** | [English](README_en.md)]

## ℹ️ Information

**GunFight Arena** is a gunfight game addon for Minecraft Bedrock Edition, supporting multiplayer gameplay with various modes.

> [!IMPORTANT]
> This version will no longer receive major updates, as I will start working on the second version. The main planned improvements include:  
>  
> 1. A more structured and organized codebase  
> 2. A custom-designed weapon system and UI  
>  
> This will be a long-term project, and I hope to continue developing and improving this addon.

## 📦 Installation & Usage

### 1️⃣ Installation

1. Go to **Releases**, find the corresponding version, and download the `.mcworld` file.  
2. Open the `.mcworld` file to import it into the game and load it into a playable world.  
3. Make sure **Experimental Features - Beta API** are enabled in the world settings.  

> [!WARNING]
> The current version does not support custom maps yet. However, you can edit the `src/config.ts` file, modify its contents, and install it in other maps—it should work as expected.\
> If needed, I will provide documentation on the `config` file later.  

### 2️⃣ Usage

```
/function gf/join      # Join the game
/function gf/left      # Leave the game
/function gf/gamestart # Start the game
```

## 🎮 Gameplay

### **Demolition Mode**

- **Game Rules**:
    - Players are divided into **Red Team (Attackers)** and **Blue Team (Defenders)**.
The attackers' objective is to plant the bomb, while the defenders must prevent and defuse it.
    - If the bomb successfully explodes or all defenders are eliminated, the Red Team wins; otherwise, the Blue Team wins.
    - The game will switch sides when more than half of the total rounds have been played.

- **How to Play**:
    - During the preparation phase, Right-Click the feather in your inventory to open the shop.
    - While holding the bomb, hold Right-Click to plant it. While holding the wire cutters, hold Right-Click to defuse the bomb.
    - When holding a weapon:\
        a. `Sneak` to enter aiming mode. \
        b. Press `Right-Click` to shoot. \
        c. `Sneak` + `Left-Click` to reload.

## 📜 Contributions

**👤Author**: [@xigma0512](https://github.com/xigma0512)  
**🎨AplokGun Addon**: [Aplok Guns](https://mcpedl.com/aplok-guns/), developed by [@GabrielAplok](https://github.com/gabriel-aplok/)  
**⭐Personal Sidebar Scoreboard**: [@MonkeyChan](https://www.youtube.com/@MonkeyChan118)  


## 🏛️ License
This project is licensed under the MIT License. See the LICENSE file for details.

## 📌 TODO
- [ ] Enable custom settings to allow map selection  
- [x] Implement a game statistics tracking system  

## 🛠️ Known Issues
- [ ] The boss bar for the bomb does not display from a far enough distance, making it difficult to see the bomb in some situations.  