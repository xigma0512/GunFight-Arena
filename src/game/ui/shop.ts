import { Player, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { ItemTable } from "../../core/utils/weapon/table";
import { PropertyManager } from "../property/_manager";

export function shop(player: Player) {
    const form = new ActionFormData().title("- CHOOSE YOUR GUN -");
    for (const [index, name] of Object.entries(ItemTable.weaponNameTable)) {
        form.button(name);
    }

    // @ts-ignore
    system.run(() => form.show(player).then(res => {
        if (res.canceled) return - 1;
        const result = res.selection as number;
        PropertyManager.entity(player).get(result < 8 ? 'main_weapon' : 'pistol').update(result);
        player.sendMessage(`You choose weapon ${ItemTable.weaponNameTable[result]}`);
    }));
}