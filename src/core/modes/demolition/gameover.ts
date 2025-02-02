import { IState } from "../../../declare/types"
import Demolition from "./_handler"
import { States } from "../../../declare/enums";
import { Utils } from "../../utils/utils";

export default class GameOver implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.GameOver;

    entry() {
        this.base.setTimer(10);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        this.base.players.forEach(pl => {
            pl.onScreenDisplay.setActionBar(`Back to the lobby in ${this.base.timer} seconds.`)
        })
        if (this.base.timer <= 0) this.exit();
    }

    exit() {
        this.base.players.forEach(pl => {
            Utils.resetPlayerData(pl);
        });
        Utils.resetGameData();

        this.base.getState(States.Demolition.Waiting).entry();
    }

}