import { Player, system, world } from "@minecraft/server";
import { PropertyManager } from "../property/_manager";
import { Team } from "../declare/enums";

const randomTeam = (players: Player[]) => {
    const suffledPlayers = players.sort(() => Math.random() - 0.5)

    const mid = Math.ceil(suffledPlayers.length / 2);

    const red = suffledPlayers.slice(mid);
    red.forEach(p => {
        PropertyManager.entity(p).get('team').update(Team.Red)
        world.scoreboard.getObjective('team')?.setScore(p, 1)
    });

    const blue = suffledPlayers.slice(0, mid);
    blue.forEach(p => {
        PropertyManager.entity(p).get('team').update(Team.Blue)
        world.scoreboard.getObjective('team')?.setScore(p, 2)
    });
}
export { randomTeam }