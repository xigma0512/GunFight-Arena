import { PropertyManager } from "../../property/_manager"
import { GameMode } from "../../declare/enums"

import { demolition } from "./status/demolition/_demolition"

const status_detect = (tickingTime: number) => {
    const gameMode = PropertyManager.world().get('game_mode').value
    switch (gameMode) {
        case GameMode.Demolition: demolition(tickingTime); break;
    }
}
export { status_detect }