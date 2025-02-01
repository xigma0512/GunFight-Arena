import { IState } from "../../../declare/types"
import Demolition from "./_handler"
import { States } from "../../../declare/enums";
import { Utils } from "../../utils/utils";

export default class GameOver implements IState {

    private get base() { return Demolition.instance; }

    update() {
        this.base.players.forEach(pl => {
            pl.onScreenDisplay.setActionBar(`Back to the lobby in ${this.base.time} seconds.`)
        })
        if (this.base.time <= 0) this.exit();
    }

    exit() {
        this.base.players.forEach(pl => {
            Utils.resetPlayerData(pl)
            Utils.tp2TeamSpawn(pl);
        });
        Utils.resetGameData();
        this.base.state = States.Demolition.Waiting;
    }

}