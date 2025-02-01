import { States } from "../../../declare/enums";
import { IStateHandler } from "../../../declare/types"
import { Utils } from "../../utils/utils";
import Demolition from "./_handler";

export default class SleepingHanlder implements IStateHandler {

    private get demolition() { return Demolition.instance; }

    update() {
        for (const player of this.demolition.players)
            player.onScreenDisplay.setActionBar(`Next Round will start in ${this.demolition.time} seconds.`);
        if (this.demolition.time <= 0) this.exit();
    }

    exit() {
        this.demolition.time = 20;
        this.demolition.players.forEach(pl => Utils.respawnPlayer(pl));

        this.demolition.state = States.Demolition.Preparing;
    }
}