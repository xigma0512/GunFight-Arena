import { IStateHandler } from "../../../declare/types";
import Demolition from "./_handler";
import Equipment from "../../equipment/equipment";

import { InputPermissionCategory } from "@minecraft/server";
import { States } from "../../../declare/enums";

export default class PreparingHandler implements IStateHandler {

    private get demolition() { return Demolition.instance; }

    update() {
        this.demolition.players.forEach(player => {
            player.onScreenDisplay.setActionBar(`Round Starts in ${this.demolition.time} sec(s).\nUse feather to open the shop.`)
            if (this.demolition.time <= 5) player.playSound('note.harp');
        })
        if (this.demolition.time <= 0) this.exit();
    }

    exit() {
        this.demolition.time = 600;
        this.demolition.players.forEach(pl => {
            Equipment.send(pl);


            pl.playSound('random.levelup');
        });
        this.demolition.state = States.Demolition.Running;
    }
}