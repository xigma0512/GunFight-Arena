import Demolition from "./status/_demolition";

import { PropertyManager } from "../property/_manager";

import { EGameMode } from "../declare/enums";

export default function primarySystemRun() {
    mode_manager();
}

function mode_manager() {
    const gameMode = PropertyManager.world().get('game_mode').value
    switch (gameMode) {
        case EGameMode.Demolition: Demolition.instance.tick(); break;
    }
}