import { IStateHandler } from "../../../declare/types";
import Demolition from "./_handler";
import Property from "../../../game/property/_handler";
import PTeamScore from "../../../game/property/world/team_score";

import { States, Team } from "../../../declare/enums";
import config from "../../../config";

import { Player, system } from "@minecraft/server";
import { Utils } from "../../utils/_utils";

export default class RunningHandler implements IStateHandler {

    private get demolition() { return Demolition.instance; }

    update() {
        const teamPlayers = (t: Team) =>
            this.demolition.players.filter(p => Property.entity(p).get('team').value === t);

        const [blueTeamPlayers, redTeamPlayers] = [teamPlayers(Team.Blue), teamPlayers(Team.Red)];

        if (this.demolition.time <= 595) {
            if (blueTeamPlayers.length == 0) return this.exit(Team.Red);
            else if (redTeamPlayers.length == 0) return this.exit(Team.Blue);

            if (getTeamAlive(Team.Blue, this.demolition.players) <= 0) this.nextRound(Team.Red);
            else if (getTeamAlive(Team.Red, this.demolition.players) <= 0) this.nextRound(Team.Blue);
        }

        if (this.demolition.time <= 0) {
            this.demolition.players.forEach(p => p.sendMessage("Time is Over."));
            this.nextRound(Team.Blue);
        }
    }

    private nextRound(winnerTeam: Team) {
        const pteam = Property.world().get("team_score") as PTeamScore
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);
        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore) return this.exit(winnerTeam);

        this.demolition.players.forEach(pl => {
            pl.sendMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`);
            pl.playSound("random.anvil_break");
        });

        this.demolition.state = States.Demolition.Sleeping;
        system.runTimeout(() => {
            this.demolition.time = 20;
            this.demolition.players.forEach(pl => Utils.respawnPlayer(pl));

            this.demolition.state = States.Demolition.Preparing;
        }, 100);
    }

    exit(winnerTeam: Team) {
        if (winnerTeam == undefined)
            return console.warn("winner should not be undefined");

        this.demolition.players.forEach(pl => {
            Utils.clearInventory(pl);
            Utils.setGameMode(pl, "spectator");

            pl.sendMessage('§l§a- GAMEOVER -')
            pl.sendMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §eis the winner!`)
        });

        this.demolition.time = 15;
        this.demolition.state = States.Demolition.GameOver;
    }

}

function getTeamAlive(team: Team, players: Player[]) {
    let result = 0;
    for (const pl of players) {
        const pt = Property.entity(pl).get('team').value as Team;
        const palive = Property.entity(pl).get('alive').value as boolean;

        if (pt == team && palive) result++;
    }
    return result;
}