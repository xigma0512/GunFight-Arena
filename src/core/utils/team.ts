import Property from "../../game/property/_handler";

import { Team } from "../../declare/enums";
import { Player } from "@minecraft/server";

export namespace TeamUtils {
    export function getAlive(team: Team, players: Player[]) {
        let result = 0;
        for (const pl of players) {
            const pt = Property.entity(pl).get('team').value as Team;
            const palive = Property.entity(pl).get('alive').value as boolean;

            if (pt == team && palive) result++;
        }
        return result;
    }

    export function getPlayers(team: Team, players: Player[]) {
        return players.filter(pl => Property.entity(pl).get('team').value === team);
    }
}