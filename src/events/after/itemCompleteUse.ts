import Property from "../../property/_handler";
import Demolition from "../../game/modes/demolition/_handler";
import { Mode, States, Team } from "../../declare/enums";

import { ItemCompleteUseAfterEvent, ItemStack, Player, system, Vector3, world } from "@minecraft/server";
import config from "../../config";
import { BroadcastUtils } from "../../utils/broadcast";

export default abstract class itemCompleteUse {
    static subscribe = () => {
        return world.afterEvents.itemCompleteUse.subscribe(ev => {
            if (Property.world().get('game_mode').value != Mode.Demolition) return;

            const item = ev.itemStack;
            if (item.typeId === "gunfight_arena:c4") summonC4(ev.source);
            if (item.typeId === "gunfight_arena:wire_stripper") defuseC4(ev.source);
        });
    }
    static unsubscribe = (ev: (args: ItemCompleteUseAfterEvent) => void) => world.afterEvents.itemCompleteUse.unsubscribe(ev)
}


const distance = (from: Vector3, to: Vector3) =>
    Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2) + Math.pow(to.z - from.z, 2));

function summonC4(player: Player) {

    const [bombPoints, scale] = [config.demolition.bomb.bomb_point, config.demolition.bomb.bomb_point_range];

    let inRange = false;
    for (const [pointName, point] of Object.entries(bombPoints)) {
        if (distance(point, player.location) > scale) continue;
        inRange = true;
    }
    if (!inRange) {
        player.sendMessage("You are not in bomb position.");
        player.getComponent("inventory")?.container?.addItem(new ItemStack("gunfight_arena:c4"));
        return;
    }

    const bomb = world.getDimension("overworld").spawnEntity("gunfight_arena:c4", player.location);
    Demolition.instance.registerBomb(bomb);

    BroadcastUtils.message(`§l§cBomb Has Been Planted §fBy §e${player.name}.`, 'message');
    BroadcastUtils.sound('random.fuse');
    Demolition.instance.getState(States.Demolition.BombPlanted).entry();
}

function defuseC4(player: Player) {

    const bomb = Demolition.instance.getBomb();
    if (bomb === undefined) {
        player.sendMessage("Cannot found C4.");
        return;
    }

    if (distance(bomb.location, player.location) > 1.2) {
        player.sendMessage("Cannot found C4 in this position.");
        return;
    }

    bomb.kill();
    Demolition.instance.unRegisterBomb();
    BroadcastUtils.message(`§l§aBomb has Been Defused §fBy §e${player.name}.`, 'message');
    BroadcastUtils.sound('mob.ravager.celebrate');
    Demolition.instance.getState(States.Demolition.BombPlanted).exit(Team.Blue);
}