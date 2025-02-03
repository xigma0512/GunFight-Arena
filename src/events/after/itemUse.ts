import { world } from "@minecraft/server";
import { ItemUseBeforeEvent } from "@minecraft/server"
import { shop } from "../../ui/shop";

export default abstract class itemUse {
    static subscribe = () => {
        return world.beforeEvents.itemUse.subscribe(ev => {
            if (ev.itemStack.typeId === "minecraft:feather") shop(ev.source);
        })
    }
    static unsubscribe = (ev: (args: ItemUseBeforeEvent) => void) => world.beforeEvents.itemUse.unsubscribe(ev)
}