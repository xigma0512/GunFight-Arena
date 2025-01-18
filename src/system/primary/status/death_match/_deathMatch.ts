import { PropertyManager } from "../../../../property/_manager"
import { Status } from "../../../../declare/enums"

import { waiting } from "./waiting"
import { running } from "./running"
import { preparing } from "./preparing"
import { gameover } from "./gameover"

const deathMatch = (tickingTime: number) => {
    const currentStatus = PropertyManager.world().get('game_status').value
    switch (currentStatus) {
        case Status.Waiting: waiting(tickingTime); break;
        case Status.Preparing: preparing(tickingTime); break;
        case Status.Running: running(tickingTime); break;
        case Status.GameOver: gameover(tickingTime); break;
    }
}
export { deathMatch }