import Demolition from "./status/_demolition";

import { PropertyManager } from "../property/_manager";

import { Mode } from "../declare/enums";
import { world } from "@minecraft/server";

export default function primarySystemRun() {
    mode_manager();
    giveEffect();
    inGame_detect();
}

function mode_manager() {
    const gameMode = PropertyManager.world().get('game_mode').value
    switch (gameMode) {
        case Mode.Demolition: Demolition.instance.tick(); break;
    }
}

function giveEffect() {
    world.getAllPlayers().forEach(player => {
        player.addEffect('saturation', 20, { amplifier: 1, showParticles: false });
    });
}

function inGame_detect() {
    for (const pl of world.getAllPlayers()) {
        if (pl.hasTag('inGame')) return Demolition.instance.addPlayer(pl);
        if (!pl.hasTag('inGame')) return Demolition.instance.removePlayer(pl);
    }
}