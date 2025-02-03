import Demolition from "./_handler";
import Property from "../../../property/_handler";
import { PlayerUtils } from "../../../utils/player";

import { IState } from "../../../declare/types";
import { States, Team } from "../../../declare/enums";

import { world, Player } from "@minecraft/server";
import { BroadcastUtils } from "../../../utils/broadcast";

export default class Idle implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.Idle;

    entry() {
        this.base.setTimer(-1);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        for (const p of world.getAllPlayers()) {
            p.onScreenDisplay.setActionBar(`Waiting for more players...(${this.base.players.length}/10)`);
            p.addEffect('instant_health', 30, { amplifier: 255, showParticles: false });
        }
        if (this.base.players.length >= world.getAllPlayers().length) this.exit();
    }

    exit() {
        randomTeam(this.base.players);
        this.base.players.forEach(pl => PlayerUtils.respawn(pl));

        BroadcastUtils.message('§l§oCredits:§r\n', 'message');
        BroadcastUtils.message('§f- §cGame Design §bby §7@xigma0512\n', 'message');
        BroadcastUtils.message('§f- §cGun Models §bby §7@GabrielAplok\n', 'message');
        BroadcastUtils.message('§f- §cMap §bCreating by §7@_Codre_\n', 'message');
        BroadcastUtils.message('        §bPorting by §7@AzozGamer936', 'message');

        this.base.getState(States.Demolition.Preparation).entry();
    }

}

function randomTeam(players: Player[]) {
    const suffledPlayers = players.sort(() => Math.random() - 0.5)

    const mid = Math.ceil(suffledPlayers.length / 2);

    const red = suffledPlayers.slice(mid);
    red.forEach(p => {
        Property.entity(p).get('team').update(Team.Red)
        world.scoreboard.getObjective('team')?.setScore(p, 1)
    });

    const blue = suffledPlayers.slice(0, mid);
    blue.forEach(p => {
        Property.entity(p).get('team').update(Team.Blue)
        world.scoreboard.getObjective('team')?.setScore(p, 2)
    });
}