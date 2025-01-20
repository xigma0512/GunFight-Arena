import { PropertyManager } from "../../../../property/_manager"
import { Status } from "../../../../declare/enums"

import { waiting } from "../demolition/waiting"
import { running } from "../demolition/running"
import { preparing } from "../demolition/preparing"
import { gameover } from "../demolition/gameover"

const demolition = (tickingTime: number) => {
    const currentStatus = PropertyManager.world().get('game_status').value
    switch (currentStatus) {
        case Status.Waiting: waiting(tickingTime); break;
        case Status.Preparing: preparing(tickingTime); break;
        case Status.Running: running(tickingTime); break;
        case Status.GameOver: gameover(tickingTime); break;
    }
}
export { demolition }