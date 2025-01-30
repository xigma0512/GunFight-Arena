import { IStateHandler } from "../../declare/types";
import Demolition from "./_demolition";
import { giveEquipment } from "../../utils/weapon/give";

import { InputPermissionCategory } from "@minecraft/server";
import { Status } from "../../declare/enums";

export default class PreparingHandler implements IStateHandler {

    private static _instance: PreparingHandler;
    static get instance() { return (this._instance || (this._instance = new this())); }

    update() {
        const demolition = Demolition.instance;

        demolition.players.forEach(player => {
            player.onScreenDisplay.setActionBar(`Round Starts in ${demolition.time} sec(s).`)
            if (demolition.time <= 5) player.playSound('note.harp');
        })
        if (demolition.time <= 0) this.exit();
    }

    exit() {
        const demolition = Demolition.instance;
        demolition.time = 600;
        demolition.players.forEach(pl => {
            giveEquipment(pl);
            pl.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, true);

            pl.playSound('random.levelup');
        });
        demolition.state = Status.Running;
    }
}