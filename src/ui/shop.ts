import { Player, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { ItemTable } from "../game/equipment/table";
import Property from "../property/_handler";

export function shop(player: Player) {
    const form = new ActionFormData().title("§l- CHOOSE YOUR GUN -");
    for (const [_, name] of Object.entries(ItemTable.weaponNameTable)) {
        form.button('§l'.concat(name), `textures/items/guns/${name.toLowerCase()}`);
    }

    // @ts-ignore
    system.run(() => form.show(player).then(res => {
        if (res.canceled) return - 1;
        const result = res.selection as number;
        Property.entity(player).get(result < 8 ? 'main_weapon' : 'secondary_weapon').update(result);
        player.sendMessage(`§e§lYou choose ${ItemTable.weaponNameTable[result]} as your weapon`);
    }));
}