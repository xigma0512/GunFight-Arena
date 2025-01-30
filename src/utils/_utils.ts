import { EntityInventoryComponent, GameMode, InputPermissionCategory, ItemLockMode, ItemStack, Player, world } from "@minecraft/server";
import { PropertyManager } from "../property/_manager";

import { Team } from "../declare/enums";
import config from "../config";


/* Reset player data */
export const resetPlayerData = (player: Player) => {
    clearInventory(player);
    setGameMode(player, 'adventure');
    tp2Lobby(player);

    const prop = PropertyManager.entity(player);
    for (const [propName, propObject] of Object.entries(prop.properties())) propObject.update();
}


/* Reset round */
export const respawnPlayer = (player: Player) => {
    const team = PropertyManager.entity(player).get('team').value as Team;
    const palive = PropertyManager.entity(player).get('alive');

    player.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, false);
    clearInventory(player);
    setGameMode(player, 'adventure');
    tp2TeamSpawn(player, team);
    palive.update(true);
    player.addEffect('health_boost', 2000000, { amplifier: 9, showParticles: false });
    player.addEffect('instant_health', 1, { amplifier: 99 });

    const item = new ItemStack('feather');
    item.lockMode = ItemLockMode.slot;
    player.getComponent('inventory')?.container?.setItem(8, item);
}


/* clear bag */
export const clearInventory = (player: Player) => (player.getComponent('inventory') as EntityInventoryComponent).container?.clearAll();


/* set gamemode */
export const setGameMode = (player: Player, mode: 'creative' | 'survival' | 'adventure' | 'spectator') => player.setGameMode(
    {
        'creative': GameMode.creative,
        'survival': GameMode.survival,
        'adventure': GameMode.adventure,
        'spectator': GameMode.spectator
    }[mode]);


/* get team alive */
export const getTeamAlive = (team: Team) => {
    let result = 0;
    world.getAllPlayers().forEach(p => {
        const pt = PropertyManager.entity(p).get('team').value as Team;
        const palive = PropertyManager.entity(p).get('alive').value as boolean;

        if (pt == team && palive) result++;
    });
    return result;
}


/* Teleport */
export const tp2TeamSpawn = (player: Player, team: Team) => {
    let spawn = config.lobby_spawn;
    switch (team) {
        case Team.Blue: spawn = config.demolition.spawn_point.blue_team; break;
        case Team.Red: spawn = config.demolition.spawn_point.red_team; break;
        case Team.None:
        default:
            break;
    }
    player.teleport(spawn);
}

export const tp2Lobby = (player: Player) => player.teleport(config.lobby_spawn);