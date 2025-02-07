import { PlayerLeaveBeforeEvent, system, world } from "@minecraft/server";
import Property from "../../../property/_handler";
import { Mode } from "../../../declare/enums";
import ModeManager from "../../../game/modes/_manager";

export default abstract class playerLeave {
    static subscribe = () => {
        return world.beforeEvents.playerLeave.subscribe(ev => {
            const mode = ModeManager.getMode(Property.world().get('game_mode').value as Mode);
            system.run(()=> mode.removePlayer(ev.player));
        })
    }
    static unsubscribe = (ev: (args: PlayerLeaveBeforeEvent) => void) => world.beforeEvents.playerLeave.unsubscribe(ev)
}