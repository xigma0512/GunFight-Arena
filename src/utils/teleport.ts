import { Player } from "@minecraft/server";
import { Team } from "../declare/enums";
import config from "../config";

const toTeamSpawn = (player: Player, team: Team) => {
    let spawn = config.spawn_point.lobby
    switch (team) {
        case Team.Blue: spawn = config.spawn_point.blue_team_spawn; break;
        case Team.Red: spawn = config.spawn_point.red_team_spawn; break;
        case Team.Spectator: spawn = config.spawn_point.spectator_spawn; break;
        case Team.None: spawn = config.spawn_point.lobby; break;
    }
    player.teleport(spawn)
}

const toLobby = (player: Player) => player.teleport(config.spawn_point.lobby)

const toRandomSpawn = (player: Player) => {
    const randomSpawn = config.spawn_point.random_spawn;
    player.teleport(randomSpawn[Math.floor(Math.random() * randomSpawn.length)])
}

export { toTeamSpawn, toLobby, toRandomSpawn }