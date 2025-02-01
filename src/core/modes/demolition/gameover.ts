import { IStateHandler } from "../../../declare/types"
import Demolition from "./_handler"
import { States } from "../../../declare/enums";
import { Utils } from "../../utils/utils";

export default class GameOverHanlder implements IStateHandler {

    private get demolition() { return Demolition.instance; }

    update() {
        this.demolition.players.forEach(pl => {
            pl.onScreenDisplay.setActionBar(`Back to the lobby in ${this.demolition.time} seconds.`)
        })
        if (this.demolition.time <= 0) this.exit();
    }

    exit() {
        this.demolition.players.forEach(pl => {
            Utils.resetPlayerData(pl)
            Utils.tp2TeamSpawn(pl);
        });
        Utils.resetGameData();
        this.demolition.state = States.Demolition.Waiting;
    }

}