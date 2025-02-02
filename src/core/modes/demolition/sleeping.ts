import { States } from "../../../declare/enums";
import { IState } from "../../../declare/types"
import { Utils } from "../../utils/utils";
import Demolition from "./_handler";

export default class Sleeping implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.Sleeping;

    entry() {
        this.base.setTimer(5);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        for (const player of this.base.players)
            player.onScreenDisplay.setActionBar(`Next Round will start in ${this.base.timer} seconds.`);
        if (this.base.timer <= 0) this.exit();
    }

    exit() {
        this.base.players.forEach(pl => Utils.respawnPlayer(pl));

        this.base.getState(States.Demolition.Preparing).entry();
    }
}