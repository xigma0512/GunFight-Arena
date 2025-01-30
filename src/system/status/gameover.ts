import { IStateHandler } from "../../declare/types"
import Demolition from "./_demolition"
import { resetPlayerData } from "../../utils/_utils"

export default class GameOverHanlder extends Demolition implements IStateHandler {

    constructor() { super(); }

    update() {
        this.players.forEach(pl => {
            pl.onScreenDisplay.setActionBar(`Back to the lobby in ${this.time} seconds.`)
        })
        if (this.time <= 0) this.exit();
    }

    exit() {
        this.players.forEach(pl => resetPlayerData(pl));
    }

}