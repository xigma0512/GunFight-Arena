import Demolition from "./_handler";
import Equipment from "../../equipment/equipment";

import { BroadcastUtils } from "../../../utils/broadcast";
import { PlayerUtils } from "../../../utils/player";

import config from "../../../config";
import { IState } from "../../../declare/types";
import { States } from "../../../declare/enums";
import { DroppedBombHandler } from "../../bomb/droppedBomb";
import { PlantedBombHandler } from "../../bomb/plantedBomb";
import { world } from "@minecraft/server";


export default class Preparation implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.Preparation;

    entry() {
        this.base.setTimer(config.demolition.timer.preparation);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        this.base.players.forEach(player => {
            player.onScreenDisplay.setActionBar(`Round Starts in ${this.base.timer} sec(s).\nUse feather to open the shop.`)
            if (this.base.timer <= 5) player.playSound('note.harp');
        })
        if (this.base.timer <= 0) this.exit();
    }

    exit() {
        DroppedBombHandler.instance.kill();
        PlantedBombHandler.instance.kill();
        world.getDimension('overworld').getEntities({type: "gunfight_arena:dropped_bomb"}).forEach(entity => entity.kill());
        world.getDimension('overworld').getEntities({type: "gunfight_arena:planted_bomb"}).forEach(entity => entity.kill());

        this.base.players.forEach(pl => {
            Equipment.send(pl);
            PlayerUtils.setMovement(pl, true);
        });
        BroadcastUtils.sound('random.levelup');

        this.base.getState(States.Demolition.Running).entry();
    }
}