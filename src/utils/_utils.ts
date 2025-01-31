import { EntityInventoryComponent, GameMode, InputPermissionCategory, ItemLockMode, ItemStack, Player } from "@minecraft/server";
import { PropertyManager } from "../property/_manager";

import { Mode, Status, Team } from "../declare/enums";
import config from "../config";
import Demolition from "../gamemode/demolition/_handler";
import PTeamScore from "../property/world/team_score";


export const resetProp = () => {
    PropertyManager.world().get('game_mode').update(Mode.Demolition);
    Demolition.instance.state = Status.Waiting;
    (PropertyManager.world().get('team_score') as PTeamScore).updateTeamScore(Team.Blue, 0);
    (PropertyManager.world().get('team_score') as PTeamScore).updateTeamScore(Team.Red, 0);
}


/* Reset player data */
export const resetPlayerData = (player: Player) => {
    clearInventory(player);
    setGameMode(player, 'adventure');
    tp2Lobby(player);
    player.removeTag('inGame');
    player.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, true);

    const prop = PropertyManager.entity(player);
    for (const [_, propObject] of Object.entries(prop.properties())) {
        propObject.update();
    }
}


/* respawn player */
export const respawnPlayer = (player: Player) => {
    const team = PropertyManager.entity(player).get('team').value as Team;
    const palive = PropertyManager.entity(player).get('alive');

    player.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, false);
    clearInventory(player);
    setGameMode(player, 'adventure');
    tp2TeamSpawn(player, team);
    palive.update(true);
    player.addEffect('health_boost', 2000000, { amplifier: 4, showParticles: false });
    player.addEffect('instant_health', 2, { amplifier: 99 });

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