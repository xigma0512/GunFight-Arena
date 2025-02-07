import Property from "../property/_handler";
import ModeManager from "../game/modes/_manager";
import { PlayerUtils } from "./player";
import { Mode, States, Team } from "../declare/enums";
import PTeamScore from "../property/world/team_score";

import { Player, world } from "@minecraft/server";

export abstract class ResetUtils {
    static inGameData() {
        for (const player of world.getAllPlayers()) {
            ModeManager.getMode(Property.world().get('game_mode').value as number).removePlayer(player);
        }
        Property.world().get('game_mode').update(Mode.Demolition);
        ModeManager.getMode(Mode.Demolition).setCurrentState(States.Demolition.Idle);
        (Property.world().get('team_score') as PTeamScore).updateTeamScore(Team.Blue);
        (Property.world().get('team_score') as PTeamScore).updateTeamScore(Team.Red);
    }

    static playerData(player: Player) {
        for (const [_, propObject] of Object.entries(Property.entity(player).properties())) {
            propObject.update();
        }
        PlayerUtils.clearInventory(player);
        PlayerUtils.setMovement(player, true);
        PlayerUtils.setGameMode(player, 'adventure');
        
        PlayerUtils.tp2Spawn(player);

        player.nameTag = player.name;
    }
}