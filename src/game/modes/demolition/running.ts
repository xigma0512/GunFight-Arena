import Demolition from "./_handler";
import Property from "../../../property/_handler";
import PTeamScore from "../../../property/world/team_score";
import { DroppedBombHandler } from "../../bomb/droppedBomb";

import { BroadcastUtils } from "../../../utils/broadcast";
import { PlayerUtils } from "../../../utils/player";
import { TeamUtils } from "../../../utils/team";

import config from "../../../config";
import { IState } from "../../../declare/types";
import { States, Team } from "../../../declare/enums";

export default class Running implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.Running;

    entry() {
        DroppedBombHandler.instance.summon(config.demolition.bomb.spawn_point);

        this.base.setTimer(config.demolition.timer.running);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        if (this.base.timer <= 0) {
            BroadcastUtils.message("Round Time Is Over.", 'message');
            this.nextRound(Team.Blue);
        }

        const [blueTeamPlayers, redTeamPlayers] = [
            TeamUtils.getPlayers(Team.Blue, this.base.players),
            TeamUtils.getPlayers(Team.Red, this.base.players)
        ];

        if (blueTeamPlayers.length == 0) return this.exit(Team.Red);
        else if (redTeamPlayers.length == 0) return this.exit(Team.Blue);

        const [blueTeamAlive, redTeamAlive] = [
            TeamUtils.getAlive(Team.Blue, this.base.players),
            TeamUtils.getAlive(Team.Red, this.base.players)
        ];

        if (blueTeamAlive <= 0) return this.nextRound(Team.Red);
        else if (redTeamAlive <= 0) return this.nextRound(Team.Blue);
    }

    private nextRound(winnerTeam: Team) {
        const pteam = Property.world().get("team_score") as PTeamScore
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);
        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore) return this.exit(winnerTeam);

        BroadcastUtils.message(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`, 'message');
        BroadcastUtils.sound("random.anvil_break");

        this.base.getState(States.Demolition.Waiting).entry();
    }

    exit(winnerTeam: Team) {
        if (winnerTeam == undefined)
            return console.warn("winner should not be undefined");

        this.base.players.forEach(pl => {
            PlayerUtils.clearInventory(pl);
            PlayerUtils.setGameMode(pl, "spectator");
        });
        BroadcastUtils.message('§l§a- GAMEOVER -', 'message');
        BroadcastUtils.message(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §eis the winner!`, 'message')

        this.base.getState(States.Demolition.GameOver).entry();
    }

}