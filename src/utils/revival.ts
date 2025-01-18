import { GameMode, Player, system } from "@minecraft/server"
import config from "../config"
import { PropertyManager } from "../property/_manager"
import { Team } from "../declare/enums"
import { toTeamSpawn } from "./teleport"
import { giveArmor, giveWeapon } from "./weapon/give"

const revival = (player: Player) => system.runTimeout(() => {
    const team = PropertyManager.entity(player).get('team').value as Team
    const main_weapon = PropertyManager.entity(player).get('main_weapon').value as number;
    const pistol = PropertyManager.entity(player).get('pistol').value as number;

    player.setGameMode(GameMode.adventure)
    toTeamSpawn(player, team)
    player.sendMessage("Teleport to team spawnpoint.")
    giveArmor(player, team)
    giveWeapon(player, main_weapon, pistol)
    player.sendMessage("Your weapons and gear have been delivered.")

}, config.revival_time)
export { revival }