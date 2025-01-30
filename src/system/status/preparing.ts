import { IStateHandler } from "../../declare/types";
import Demolition from "./_demolition";
import { giveEquipment } from "../../utils/weapon/give";

import { InputPermissionCategory } from "@minecraft/server";

export default class PreparingHandler extends Demolition implements IStateHandler {

    constructor() { super(); }

    update() {
        this.players.forEach(player => {
            player.onScreenDisplay.setActionBar(`Round Starts in ${this.time} sec(s).`)
            if (this.time <= 5) player.playSound('note.harp');
        })
        if (this.time <= 0) this.exit();
    }

    exit() {
        this.time = 600;
        this.players.forEach(pl => {
            giveEquipment(pl);
            pl.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, true);
            pl.sendMessage("Game Start!");
        });
    }
}