import { IState } from "../../../declare/types";
import Demolition from "./_handler";
import Property from "../../../game/property/_handler";
import PTeamScore from "../../../game/property/world/team_score";

import { States, Team } from "../../../declare/enums";
import config from "../../../config";

import { Player, system } from "@minecraft/server";
import { Utils } from "../../utils/utils";

export default class Running implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.Running;

    entry() {
        this.base.setTimer(120);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        const teamPlayers = (t: Team) =>
            this.base.players.filter(p => Property.entity(p).get('team').value === t);

        const [blueTeamPlayers, redTeamPlayers] = [teamPlayers(Team.Blue), teamPlayers(Team.Red)];

        if (blueTeamPlayers.length == 0) return this.exit(Team.Red);
        else if (redTeamPlayers.length == 0) return this.exit(Team.Blue);

        if (getTeamAlive(Team.Blue, this.base.players) <= 0) this.nextRound(Team.Red);
        else if (getTeamAlive(Team.Red, this.base.players) <= 0) this.nextRound(Team.Blue);

        if (this.base.timer <= 0) {
            this.base.players.forEach(p => p.sendMessage("Time is Over."));
            this.nextRound(Team.Blue);
        }
    }

    private nextRound(winnerTeam: Team) {
        const pteam = Property.world().get("team_score") as PTeamScore
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);
        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore) return this.exit(winnerTeam);

        Utils.broadcastMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`, 'message');
        Utils.broadcastSound("random.anvil_break");

        this.base.getState(States.Demolition.Sleeping).entry();
    }

    exit(winnerTeam: Team) {
        if (winnerTeam == undefined)
            return console.warn("winner should not be undefined");

        this.base.players.forEach(pl => {
            Utils.clearInventory(pl);
            Utils.setGameMode(pl, "spectator");
        });
        Utils.broadcastMessage('§l§a- GAMEOVER -', 'message');
        Utils.broadcastMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §eis the winner!`, 'message')

        this.base.getState(States.Demolition.GameOver).entry();
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