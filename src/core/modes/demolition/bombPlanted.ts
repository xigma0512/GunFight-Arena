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

    update() {
        const bomb = this.base.getBomb();
        if (bomb === undefined) return;

        const health = bomb.getComponent('health') as EntityHealthComponent;
        const damagePerSec = health.effectiveMax / config.demolition.bomb_timer;
        health.setCurrentValue(damagePerSec * this.base.time);

        if (this.base.time <= 0) this.exit(Team.Red);
    }

    exit(winnerTeam: Team) {
        const pteam = Property.world().get("team_score") as PTeamScore
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);

        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore)
            return this.base.handlers[States.Demolition.Running].exit(winnerTeam);

        Utils.broadcastMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`, 'message');
        this.base.time = 5;
        this.base.state = States.Demolition.Sleeping;
    }
}