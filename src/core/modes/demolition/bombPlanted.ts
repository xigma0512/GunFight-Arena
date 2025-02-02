import Demolition from "./_handler";
import Property from "../../../game/property/_handler";
import PTeamScore from "../../../game/property/world/team_score";

import config from "../../../config";

import { Utils } from "../../utils/utils";
import { IState } from "../../../declare/types"
import { States, Team } from "../../../declare/enums";

import { EntityHealthComponent } from "@minecraft/server";

export default class BombPlanted implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.BombPlanted;

    entry() {
        this.base.setTimer(40);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        const bomb = this.base.getBomb();
        if (bomb === undefined) return;

        const health = bomb.getComponent('health') as EntityHealthComponent;
        const damagePerSec = health.effectiveMax / config.demolition.bomb_timer;
        health.setCurrentValue(damagePerSec * this.base.timer);

        if (this.base.timer <= 0) this.exit(Team.Red);
    }

    exit(winnerTeam: Team) {
        const pteam = Property.world().get("team_score") as PTeamScore
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);

        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore)
            return this.base.getState(States.Demolition.Running).exit(winnerTeam);

        Utils.broadcastMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`, 'message');

        this.base.getState(States.Demolition.Sleeping).entry();
    }
}