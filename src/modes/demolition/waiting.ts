import { IStateHandler } from "../../declare/types";
import Demolition from "./_handler";
import { respawnPlayer } from "../../utils/_utils";
import { PropertyManager } from "../../property/_manager";

import { States, Team } from "../../declare/enums";

import { world, Player } from "@minecraft/server";

export default class WaitingHanlder implements IStateHandler {

    private get demolition() { return Demolition.instance; }

    update() {
        for (const p of this.demolition.players) {
            p.onScreenDisplay.setActionBar(`Waiting for more players...(${this.demolition.players.length}/10)`);
            p.addEffect('regeneration', 1, { amplifier: 254, showParticles: false });
            p.addEffect('absorption', 1, { amplifier: 254, showParticles: false });
        }

        if (this.demolition.players.length >= world.getAllPlayers().length) this.exit();

    }

    exit() {
        randomTeam(this.demolition.players);
        this.demolition.time = 30;

        this.demolition.players.forEach(pl => {
            pl.sendMessage('§l§oCredits:§r\n');
            pl.sendMessage('§f- §cGame Design §bby §7@xigma0512\n');
            pl.sendMessage('§f- §cGun Models §bby §7@GabrielAplok\n');
            pl.sendMessage('§f- §cMap §bCreating by §7@_Codre_\n');
            pl.sendMessage('        §bPorting by §7@AzozGamer936');
            respawnPlayer(pl);
        });

        this.demolition.state = States.Demolition.Preparing;
    }

}

function randomTeam(players: Player[]) {
    const suffledPlayers = players.sort(() => Math.random() - 0.5)

    const mid = Math.ceil(suffledPlayers.length / 2);

    const red = suffledPlayers.slice(mid);
    red.forEach(p => {
        PropertyManager.entity(p).get('team').update(Team.Red)
        world.scoreboard.getObjective('team')?.setScore(p, 1)
    });

    const blue = suffledPlayers.slice(0, mid);
    blue.forEach(p => {
        PropertyManager.entity(p).get('team').update(Team.Blue)
        world.scoreboard.getObjective('team')?.setScore(p, 2)
    });
}