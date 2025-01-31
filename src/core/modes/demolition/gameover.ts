import { IStateHandler } from "../../../declare/types"
import Demolition from "./_handler"
import { resetPlayerData, resetProp } from "../../utils/_utils"
import { States } from "../../../declare/enums";

export default class GameOverHanlder implements IStateHandler {

    private get demolition() { return Demolition.instance; }

    update() {
        this.demolition.players.forEach(pl => {
            pl.onScreenDisplay.setActionBar(`Back to the lobby in ${this.demolition.time} seconds.`)
        })
        if (this.demolition.time <= 0) this.exit();
    }

    exit() {
        this.demolition.players.forEach(pl => resetPlayerData(pl));
        resetProp();
        this.demolition.state = States.Demolition.Waiting;
    }

}