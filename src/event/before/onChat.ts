import { system, world } from "@minecraft/server";
import { ChatSendBeforeEvent } from "@minecraft/server"

import { randomTeam } from "../../utils/randomTeam";
import { changeStatus } from "../../utils/changeStatus";
import { Status } from "../../declare/enums";

abstract class onChat {
    static subscribe = () => {
        return world.beforeEvents.chatSend.subscribe(ev => {
            if (!ev.message.startsWith('.ga')) return;
            ev.cancel = true;

            const args = ev.message.split(' ')
            if (args[1] == 'rteam') {
                system.run(() => randomTeam(world.getAllPlayers()));
                ev.sender.sendMessage('random team assignment completed.')
            }
            if (args[1] == 'start') {
                system.run(() => changeStatus(Status.Preparing, world.getAllPlayers()));
                ev.sender.sendMessage("Game Start")
            }

        })
    }
    static unsubscribe = (ev: (args: ChatSendBeforeEvent) => void) => world.beforeEvents.chatSend.unsubscribe(ev)
}
export default onChat