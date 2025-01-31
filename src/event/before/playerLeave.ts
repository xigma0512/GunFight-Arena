import { PlayerLeaveBeforeEvent, world } from "@minecraft/server"
import Demolition from "../../modes/demolition/_handler"

abstract class playerLeave {
    static subscribe = () => {
        return world.beforeEvents.playerLeave.subscribe(ev => {
            Demolition.instance.removePlayer(ev.player);
        })
    }
    static unsubscribe = (ev: (args: PlayerLeaveBeforeEvent) => void) => world.beforeEvents.playerLeave.unsubscribe(ev)
}
export default playerLeave