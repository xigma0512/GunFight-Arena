import Demolition from "./_handler";
import Property from "../../../property/_handler";
import { DroppedBombHandler } from "../../bomb/droppedBomb";

import { BroadcastUtils } from "../../../utils/broadcast";
import { PlayerUtils } from "../../../utils/player";
import { TeamUtils } from "../../../utils/team";

import config from "../../../config";

import { IState } from "../../../declare/types";
import { States, Team } from "../../../declare/enums";
import PTotalStat from "../../../property/entity/total_stat";

import { Vector3 } from "@minecraft/server";

export default class Running implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.Running;

    entry() {
        const positions = Property.world().get('positions') ;
        DroppedBombHandler.instance.summon(positions.get('bomb') as Vector3);

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
        const pteam = Property.world().get("team_score");
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

            const team = Property.entity(pl).get('team').value as Team;
            const totalStat = Property.entity(pl).get('total_stat') as PTotalStat;
            const option = (team === winnerTeam ? 'wins' : 'losts');
            totalStat.updateStat(option, totalStat.getStat(option) + 1);
        });

        BroadcastUtils.message('', 'message');
        BroadcastUtils.message('§l§a-- GAMEOVER --', 'message');
        BroadcastUtils.message(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §eis the winner!`, 'message');
        BroadcastUtils.sound('mob.ravager.celebrate');
        
        this.base.getState(States.Demolition.GameOver).entry();
    }

}