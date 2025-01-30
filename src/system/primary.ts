import Demolition from "./status/_demolition";

import { PropertyManager } from "../property/_manager";

import { EGameMode } from "../declare/enums";
import { world } from "@minecraft/server";

export default function primarySystemRun() {
    mode_manager();
    giveEffect();
}

function mode_manager() {
    const gameMode = PropertyManager.world().get('game_mode').value
    switch (gameMode) {
        case EGameMode.Demolition: Demolition.instance.tick(); break;
    }
}

function giveEffect() {
    world.getAllPlayers().forEach(player => {
        player.addEffect('saturation', 20, { amplifier: 1, showParticles: false });
    });
}