import Property from "../property/_handler";
import ModeManager from "../game/modes/_manager";
import { PlayerUtils } from "./player";
import { Mode, States } from "../declare/enums";

import { Player, world } from "@minecraft/server";

export abstract class ResetUtils {
    static inGameData() {
        for (const player of world.getAllPlayers()) {
            ModeManager.getMode(Property.world().get('game_mode').value as number).removePlayer(player);
        }
        Property.world().get('game_mode').update(Mode.Demolition);
        Property.world().get('team_score').update();
        ModeManager.getMode(Mode.Demolition).setCurrentState(States.Demolition.Idle);
    }

    static playerData(player: Player) {
        const prop = Property.entity(player);
        prop.get('team').update();
        prop.get('alive').update();

        PlayerUtils.clearInventory(player);
        PlayerUtils.setMovement(player, true);
        PlayerUtils.setGameMode(player, 'adventure');
        
        PlayerUtils.tp2Spawn(player);

        player.nameTag = player.name;
    }
}