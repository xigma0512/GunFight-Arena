import { IStateHandler } from "../../declare/types";
import Demolition from "./_demolition";
import { respawnPlayer } from "../../utils/_utils";
import { PropertyManager } from "../../property/_manager";

import { Status, Team } from "../../declare/enums";

import { world, Player } from "@minecraft/server";

export default class WaitingHanlder implements IStateHandler {

    private static _instance: WaitingHanlder;
    static get instance() { return (this._instance || (this._instance = new this())); }

    update() {
        const demolition = Demolition.instance;

        for (const p of demolition.players) {
            p.onScreenDisplay.setActionBar(`Waiting for more players...(${demolition.players.length}/10)`);
            p.addEffect('regeneration', 1, { amplifier: 254, showParticles: false });
            p.addEffect('absorption', 1, { amplifier: 254, showParticles: false });
        }

        if (demolition.players.length >= world.getAllPlayers().length) {
            for (const p of demolition.players) p.sendMessage("\nAll players are ready. Game Start.\n");
            this.exit();
        }
    }

    exit() {
        const demolition = Demolition.instance;

        randomTeam(demolition.players);
        demolition.time = 30;

        demolition.players.forEach(pl => {
            pl.sendMessage('§l§oCredits:§r\n');
            pl.sendMessage('§f- §cGame Design §bby §7@xigma0512\n');
            pl.sendMessage('§f- §cGun Models §bby §7@GabrielAplok\n');
            pl.sendMessage('§f- §cMap §bCreating by §7@_Codre_\n');
            pl.sendMessage('        §bPorting by §7@AzozGamer936');
            respawnPlayer(pl);
        });

        demolition.state = Status.Preparing;
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