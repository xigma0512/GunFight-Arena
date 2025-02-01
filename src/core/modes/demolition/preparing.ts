import { IState } from "../../../declare/types";
import Demolition from "./_handler";
import Equipment from "../../equipment/equipment";

import { States } from "../../../declare/enums";
import { Utils } from "../../utils/utils";
import { ItemStack, world } from "@minecraft/server";
import config from "../../../config";

export default class Preparing implements IState {

    private get base() { return Demolition.instance; }

    update() {
        this.base.players.forEach(player => {
            player.onScreenDisplay.setActionBar(`Round Starts in ${this.base.time} sec(s).\nUse feather to open the shop.`)
            if (this.base.time <= 5) player.playSound('note.harp');
        })
        if (this.base.time <= 0) this.exit();
    }

    exit() {
        this.base.players.forEach(pl => {
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

        this.base.time = 600;
        this.base.state = States.Demolition.Running;
    }
}