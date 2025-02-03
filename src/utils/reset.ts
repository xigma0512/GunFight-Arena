import Property from "../property/_handler";
import ModeManager from "../game/modes/_manager";
import { PlayerUtils } from "./player";
import { Mode, States, Team } from "../declare/enums";
import PTeamScore from "../property/world/team_score";

import { Player } from "@minecraft/server";

export namespace ResetUtils {
    export function inGameData() {
        Property.world().get('game_mode').update(Mode.Demolition);
        ModeManager.getMode(Mode.Demolition).setCurrentState(States.Demolition.Idle);
        (Property.world().get('team_score') as PTeamScore).updateTeamScore(Team.Blue);
        (Property.world().get('team_score') as PTeamScore).updateTeamScore(Team.Red);
    }

    export function playerData(player: Player) {
        PlayerUtils.clearInventory(player);
        PlayerUtils.setMovement(player, true);
        PlayerUtils.setGameMode(player, 'adventure');
        Property.entity(player).get('alive').update();

        Property.entity(player).get('team').update(Team.None);
        ModeManager.getMode(Property.world().get('game_mode').value as number).removePlayer(player);
        PlayerUtils.tp2Spawn(player);

        player.nameTag = player.name;

        for (const [_, propObject] of Object.entries(Property.entity(player).properties())) {
            propObject.update();
        }
    }
}