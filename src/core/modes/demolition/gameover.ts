import Demolition from "./_handler"
import { ResetUtils } from "../../utils/reset";

import config from "../../../config";

import { IState } from "../../../declare/types"
import { States } from "../../../declare/enums";

export default class GameOver implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.GameOver;

    entry() {
        this.base.setTimer(config.demolition.timer.gameover);
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
            ResetUtils.playerData(pl);
        });
        ResetUtils.inGameData();

        this.base.getState(States.Demolition.Idle).entry();
    }

}