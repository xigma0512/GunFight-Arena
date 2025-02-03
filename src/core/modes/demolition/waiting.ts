import Demolition from "./_handler";

import { PlayerUtils } from "../../utils/player";

import config from "../../../config";
import { IState } from "../../../declare/types"
import { States } from "../../../declare/enums";

export default class Waiting implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.Waiting;

    entry() {
        this.base.setTimer(config.demolition.timer.waiting);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        for (const player of this.base.players)
            player.onScreenDisplay.setActionBar(`Next Round will start in ${this.base.timer} seconds.`);
        if (this.base.timer <= 0) this.exit();
    }

    exit() {
        this.base.players.forEach(pl => PlayerUtils.respawn(pl));

        this.base.getState(States.Demolition.Preparation).entry();
    }
}