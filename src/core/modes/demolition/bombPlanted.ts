import { EntityHealthComponent, world } from "@minecraft/server";
import { States, Team } from "../../../declare/enums";
import { IStateHandler } from "../../../declare/types"
import Demolition from "./_handler";
import config from "../../../config";
import { Utils } from "../../utils/utils";
import Property from "../../../game/property/_handler";
import PTeamScore from "../../../game/property/world/team_score";

export default class BombPlantedHandler implements IStateHandler {

    private get demolition() { return Demolition.instance; }

    update() {
        const bomb = this.demolition.getBomb();
        if (bomb === undefined) return;

        const health = bomb.getComponent('health') as EntityHealthComponent;
        const damagePerSec = health.effectiveMax / config.demolition.bomb_timer;
        health.setCurrentValue(damagePerSec * this.demolition.time);

        if (this.demolition.time <= 0) this.exit(Team.Red);
    }

    exit(winnerTeam: Team) {
        const pteam = Property.world().get("team_score") as PTeamScore
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);

        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore)
            return this.demolition.handlers[States.Demolition.Running].exit(winnerTeam);

        Utils.broadcastMessage(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`, 'message');
        this.demolition.time = 5;
        this.demolition.state = States.Demolition.Sleeping;
    }
}