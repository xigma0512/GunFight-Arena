import { Player, ScriptEventCommandMessageAfterEvent, system } from "@minecraft/server";
import ModeManager from "../../game/modes/_manager";
import Property from "../../property/_handler";
import { Mode, States } from "../../declare/enums";

export default abstract class ScriptMessage {
    static subscribe = () => {
        return system.afterEvents.scriptEventReceive.subscribe(ev => {
            if (ev.sourceEntity === undefined) return;
            if (!ev.id.startsWith("gunfight_arena:")) return;

            const instance = ModeManager.getMode(Property.world().get('game_mode').value as Mode);
            const id = ev.id.replace("gunfight_arena:", "");

            switch (id) {
                case "join_queue": instance.addPlayer(ev.sourceEntity as Player); break;
                case "left_queue": instance.removePlayer(ev.sourceEntity as Player); break;
                case "game_start": instance.getState(States.Demolition.Idle).exit(); break;
            }
        })
    }
    static unsubscribe = (ev: (args: ScriptEventCommandMessageAfterEvent) => void) => system.afterEvents.scriptEventReceive.unsubscribe(ev);
}