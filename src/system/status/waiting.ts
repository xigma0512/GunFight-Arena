import { IStateHandler } from "../../declare/types";
import Demolition from "./_demolition";
import { respawnPlayer } from "../../utils/_utils";
import { PropertyManager } from "../../property/_manager";

import { Status, Team } from "../../declare/enums";

import { world, Player } from "@minecraft/server";

export default class WaitingHanlder extends Demolition implements IStateHandler {

    constructor() { super(); }

    update() {
        for (const p of this.players) {
            p.onScreenDisplay.setActionBar(`Waiting for more players...(${this.players.length}/10)`);
        }
        if (this.players.length > world.getAllPlayers().length) this.exit();
    }

    exit() {

        randomTeam(this.players);
        this.time = 20;

        this.players.forEach(pl => {
            pl.sendMessage('§l§oCredits:§r\n');
            pl.sendMessage('§f- §cGame Design §bby §7@xigma0512\n');
            pl.sendMessage('§f- §cGun Models §bby §7@GabrielAplok\n');
            pl.sendMessage('§f- §cMap §bCreating by §7@_Codre_\n');
            pl.sendMessage('        §bPorting by §7@AzozGamer936');
            respawnPlayer(pl);
        });

        this.state = Status.Preparing;
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