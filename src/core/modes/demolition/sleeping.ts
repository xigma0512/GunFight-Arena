import { States } from "../../../declare/enums";
import { IState } from "../../../declare/types"
import { Utils } from "../../utils/utils";
import Demolition from "./_handler";

export default class Sleeping implements IState {

    private get base() { return Demolition.instance; }

    update() {
        for (const player of this.base.players)
            player.onScreenDisplay.setActionBar(`Next Round will start in ${this.base.time} seconds.`);
        if (this.base.time <= 0) this.exit();
    }

    exit() {
        this.base.time = 20;
        this.base.players.forEach(pl => Utils.respawnPlayer(pl));

        this.base.state = States.Demolition.Preparing;
    }
}