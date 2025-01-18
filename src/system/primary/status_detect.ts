import { PropertyManager } from "../../property/_manager"
import { GameMode } from "../../declare/enums"

import { deathMatch } from "./status/death_match/_deathMatch"

const status_detect = (tickingTime: number) => {
    const gameMode = PropertyManager.world().get('game_mode').value
    switch (gameMode) {
        case GameMode.DeathMatch: deathMatch(tickingTime); break
        case GameMode.Demolition: break
    }
}
export { status_detect }