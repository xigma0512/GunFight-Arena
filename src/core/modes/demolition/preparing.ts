import { IStateHandler } from "../../../declare/types";
import Demolition from "./_handler";
import Equipment from "../../equipment/equipment";

import { States } from "../../../declare/enums";
import { Utils } from "../../utils/utils";
import { ItemStack, world } from "@minecraft/server";
import config from "../../../config";

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
        this.demolition.players.forEach(pl => {
            Equipment.send(pl);
            Utils.setMovement(pl, true);
        });
        Utils.broadcastSound('random.levelup');

        try {
            world.getDimension('overworld').spawnItem(
                new ItemStack("gunfight_arena:c4"),
                config.demolition.spawn_point.red_team
            );
        } catch { }

        this.demolition.time = 600;
        this.demolition.state = States.Demolition.Running;
    }
}