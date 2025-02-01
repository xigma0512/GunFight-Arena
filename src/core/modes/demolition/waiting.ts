import { IStateHandler } from "../../../declare/types";
import Demolition from "./_handler";
import Property from "../../../game/property/_handler";

import { States, Team } from "../../../declare/enums";

import { world, Player } from "@minecraft/server";
import { Utils } from "../../utils/utils";

export default class WaitingHanlder implements IStateHandler {

    private get demolition() { return Demolition.instance; }

    update() {
        for (const p of world.getAllPlayers()) {
            p.onScreenDisplay.setActionBar(`Waiting for more players...(${this.demolition.players.length}/10)`);
            p.addEffect('health_boost', 30, { amplifier: 4, showParticles: false });
            p.addEffect('regeneration', 30, { amplifier: 254, showParticles: false });
            p.addEffect('absorption', 30, { amplifier: 254, showParticles: false });
        }
        if (this.demolition.players.length >= world.getAllPlayers().length) this.exit();
    }

    exit() {
        randomTeam(this.demolition.players);
        this.demolition.time = 20;

        this.demolition.players.forEach(pl => {
            pl.sendMessage('§l§oCredits:§r\n');
            pl.sendMessage('§f- §cGame Design §bby §7@xigma0512\n');
            pl.sendMessage('§f- §cGun Models §bby §7@GabrielAplok\n');
            pl.sendMessage('§f- §cMap §bCreating by §7@_Codre_\n');
            pl.sendMessage('        §bPorting by §7@AzozGamer936');
            Utils.respawnPlayer(pl);
        });

        this.demolition.state = States.Demolition.Preparing;
    }

}

function randomTeam(players: Player[]) {
    world.getAllPlayers().forEach(pl => {
        if (pl.name === "xigma0512")
            Property.entity(pl).get('team').update(Team.Blue);
        else
            Property.entity(pl).get('team').update(Team.Red);
    });

    return

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