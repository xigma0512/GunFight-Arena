import { IStateHandler } from "../../declare/types";
import Demolition from "./_demolition";
import { PropertyManager } from "../../property/_manager";
import { clearInventory, respawnPlayer, setGameMode } from "../../utils/_utils";
import PTeamScore from "../../property/world/team_score";

import { Status, Team } from "../../declare/enums";
import config from "../../config";

import { Player, system } from "@minecraft/server";

export default class RunningHandler implements IStateHandler {

    private static _instance: RunningHandler;
    static get instance() { return (this._instance || (this._instance = new this())); }

    update() {
        const demolition = Demolition.instance;

        const teamPlayers = (t: Team) =>
            demolition.players.filter(p => PropertyManager.entity(p).get('team').value === t);

        const [blueTeamPlayers, redTeamPlayers] = [teamPlayers(Team.Blue), teamPlayers(Team.Red)];

        if (demolition.time <= 595) {
            if (blueTeamPlayers.length == 0) this.exit(Team.Red);
            else if (redTeamPlayers.length == 0) this.exit(Team.Blue);
        }

        if (getTeamAlive(Team.Blue, demolition.players) <= 0) this.nextRound(Team.Red);
        else if (getTeamAlive(Team.Blue, demolition.players) <= 0) this.nextRound(Team.Red);

        if (demolition.time <= 0) {
            demolition.players.forEach(p => p.sendMessage("Time is Over."));
            this.nextRound(Team.Blue);
        }
    }

    private nextRound(winnerTeam: Team) {
        const demolition = Demolition.instance;

        const pteam = PropertyManager.world().get("team_score") as PTeamScore
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);
        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore) return this.exit(winnerTeam);

        demolition.players.forEach(pl => {
            pl.sendMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`);
            pl.playSound("random.anvil_break");
        });

        demolition.state = Status.Sleeping;
        system.runTimeout(() => {
            demolition.time = 20;
            demolition.players.forEach(pl => respawnPlayer(pl));

            demolition.state = Status.Preparing;
        }, 100);
    }

    exit(winnerTeam: Team) {
        const demolition = Demolition.instance;

        if (winnerTeam == undefined)
            return console.warn("winner should not be undefined");

        demolition.players.forEach(pl => {
            clearInventory(pl);
            setGameMode(pl, "spectator");
            pl.sendMessage('§l§a- GAMEOVER -')
            pl.sendMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §eis the winner!`)
        });

        demolition.time = 15;
        demolition.state = Status.GameOver;
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