import Demolition from "../modes/demolition/_handler";

import Property from "../../game/property/_handler";

import { Mode } from "../../declare/enums";
import { world } from "@minecraft/server";
import ModeManager from "../modes/_manager";

export default function primarySystemRun() {
    mode_manager();
    giveEffect();
    inGame_detect();
}

function mode_manager() {
    const gameMode = Property.world().get('game_mode').value as Mode
    ModeManager.getMode(gameMode).tick();
}

function giveEffect() {
    world.getAllPlayers().forEach(player => {
        player.addEffect('saturation', 20, { amplifier: 1, showParticles: false });
    });
}

function inGame_detect() {
    for (const pl of world.getAllPlayers()) {
        if (pl.hasTag('inGame')) Demolition.instance.addPlayer(pl);
        if (!pl.hasTag('inGame')) Demolition.instance.removePlayer(pl);
    }
}