import { IStateHandler } from "../../declare/types"
import Demolition from "./_demolition"
import { resetPlayerData } from "../../utils/_utils"

export default class GameOverHanlder implements IStateHandler {

    private static _instance: GameOverHanlder;
    static get instance() { return (this._instance || (this._instance = new this())); }

    update() {
        const demolition = Demolition.instance;

        demolition.players.forEach(pl => {
            pl.onScreenDisplay.setActionBar(`Back to the lobby in ${demolition.time} seconds.`)
        })
        if (demolition.time <= 0) this.exit();
    }

    exit() {
        const demolition = Demolition.instance;

        demolition.players.forEach(pl => resetPlayerData(pl));
    }

}