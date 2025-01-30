import { IStateHandler } from "../../declare/types";
import Demolition from "./_demolition";
import { PropertyManager } from "../../property/_manager";
import { clearInventory, respawnPlayer, setGameMode } from "../../utils/_utils";
import PTeamScore from "../../property/world/team_score";

import { Status, Team } from "../../declare/enums";
import config from "../../config";

import { Player, system } from "@minecraft/server";

export default class RunningHandler extends Demolition implements IStateHandler {

    constructor() { super(); }

    update() {
        const teamPlayers = (t: Team) =>
            this.players.filter(p => PropertyManager.entity(p).get('team').value === t);

        const [blueTeamPlayers, redTeamPlayers] = [teamPlayers(Team.Blue), teamPlayers(Team.Red)];

        if (this.time <= 595) {
            if (blueTeamPlayers.length == 0) this.exit(Team.Red);
            else if (redTeamPlayers.length == 0) this.exit(Team.Blue);
        }

        if (getTeamAlive(Team.Blue, this.players) <= 0) this.nextRound(Team.Red);
        else if (getTeamAlive(Team.Blue, this.players) <= 0) this.nextRound(Team.Red);

        if (this.time <= 0) {
            this.players.forEach(p => p.sendMessage("Time is Over."));
            this.nextRound(Team.Blue);
        }
    }

    private nextRound(winnerTeam: Team) {
        const pteam = PropertyManager.world().get("team_score") as PTeamScore
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);
        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore) return this.exit(winnerTeam);

        this.players.forEach(pl => pl.sendMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`));

        system.runTimeout(() => {
            this.time = 20;
            this.players.forEach(pl => respawnPlayer(pl));

            this.state = Status.Preparing;
        }, 100);
    }

    exit(winnerTeam: Team) {
        if (winnerTeam == undefined)
            return console.warn("winner should not be undefined");

        this.players.forEach(pl => {
            clearInventory(pl);
            setGameMode(pl, "spectator");
            pl.sendMessage('§l§a- GAMEOVER -')
            pl.sendMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §eis the winner!`)
        });

        this.time = 15;
        this.state = Status.GameOver;
    }

}

function getTeamAlive(team: Team, players: Player[]) {
    let result = 0;
    players.forEach(pl => {
        const pt = PropertyManager.entity(pl).get('team').value as Team;
        const palive = PropertyManager.entity(pl).get('alive').value as boolean;

        if (pt == team && palive) result++;
    });
    return result;
}