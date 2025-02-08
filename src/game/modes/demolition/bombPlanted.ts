import Demolition from "./_handler";
import Property from "../../../property/_handler";
import PTeamScore from "../../../property/world/team_score";
import { PlantedBombHandler } from "../../bomb/plantedBomb";

import config from "../../../config";

import { IState } from "../../../declare/types"
import { States, Team } from "../../../declare/enums";
import { TeamUtils } from "../../../utils/team";
import { BroadcastUtils } from "../../../utils/broadcast";

import { EntityHealthComponent, world } from "@minecraft/server";

export default class BombPlanted implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.BombPlanted;

    entry() {
        this.base.setTimer(config.demolition.timer.bombPlanted);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        const bomb = PlantedBombHandler.instance.getBomb();
        if (bomb === undefined) return;
        const location = bomb.location;

        const health = bomb.getComponent('health') as EntityHealthComponent;
        const damagePerSec = health?.effectiveMax / config.demolition.timer.bombPlanted;
        health.setCurrentValue(damagePerSec * this.base.timer);
        bomb.nameTag = `§c${this.base.timer}`;

        if (this.base.timer <= 0) {
            BroadcastUtils.particle("minecraft:huge_explosion_emitter", bomb.location);
            BroadcastUtils.sound("random.explode", {pitch:0.6});
            this.exit(Team.Red);
        }
        const [blueTeamPlayers, redTeamPlayers] = [
            TeamUtils.getPlayers(Team.Blue, this.base.players),
            TeamUtils.getPlayers(Team.Red, this.base.players)
        ];

        if (blueTeamPlayers.length == 0) return this.exit(Team.Red);
        else if (redTeamPlayers.length == 0) return this.exit(Team.Blue);

        if (TeamUtils.getAlive(Team.Blue, this.base.players) <= 0) return this.exit(Team.Red);

        location.y += 0.3;
        BroadcastUtils.particle("minecraft:explosion_particle", location);
        world.getDimension("overworld").playSound("block.click", location, {pitch: 2, volume:5});
    }

    exit(winnerTeam: Team) {
        const pteam = Property.world().get("team_score") as PTeamScore;
        pteam.updateTeamScore(winnerTeam, pteam.getTeamScore(winnerTeam) + 1);

        if (pteam.getTeamScore(winnerTeam) >= config.demolition.winningScore)
            return this.base.getState(States.Demolition.Running).exit(winnerTeam);

        BroadcastUtils.message(`§l${(winnerTeam == Team.Blue ? "§bBlue Team" : "§cRed Team")} §fwin this round.`, 'message');

        this.base.getState(States.Demolition.Waiting).entry();
    }
}