import config from "../../config";
import { Team } from "../../declare/enums";
import Property from "../../property/_handler";
import { ItemTable } from "./table";

import { ItemStack, Player, Vector3, world } from "@minecraft/server"
import { Container, EntityEquippableComponent, EntityInventoryComponent, EnchantmentType, EquipmentSlot, ItemEnchantableComponent } from "@minecraft/server";
import { ItemLockMode } from "@minecraft/server"

export default abstract class Equipment {

    private static getSpecialItem(slot: number) {
        const storage = world.getDimension('overworld').getBlock(Property.world().get('positions').get('container') as Vector3)
        const container = storage?.getComponent('inventory')?.container as Container
        return container.getItem(slot) as ItemStack
    }

    private static sendWeapon(player: Player, mainId: number, secondaryId: number) {
        const inventory = player.getComponent('inventory') as EntityInventoryComponent;

        const equipmentInfo = ItemTable.weapon[mainId].concat(ItemTable.weapon[secondaryId])
        equipmentInfo.forEach(item => {
            const [id, amount, slot] = item
            let itemStack = new ItemStack(id, amount)
            if (itemStack.typeId == "gabrielaplok:awp")
                itemStack = this.getSpecialItem(config.container.awp)

            itemStack.lockMode = ItemLockMode.slot
            inventory.container?.setItem(slot, itemStack)
        });
    }

    private static sendArmor(player: Player, team: Team) {
        const equipment = player.getComponent("equippable") as EntityEquippableComponent;
        const armor = (team == Team.Blue ? config.container.blue_armor : config.container.red_armor)

        armor.forEach((slot, i) => {
            const itemStack = this.getSpecialItem(slot)

            itemStack.lockMode = ItemLockMode.slot
            const enchant = itemStack.getComponent('enchantable') as ItemEnchantableComponent
            enchant.addEnchantment({ level: 3, type: new EnchantmentType("unbreaking") })

            equipment.setEquipment([
                EquipmentSlot.Head,
                EquipmentSlot.Chest,
                EquipmentSlot.Legs,
                EquipmentSlot.Feet
            ][i], itemStack)
        })
    }

    private static sendTeamEquipment(player: Player, team: Team) {
        const inventory = player.getComponent('inventory') as EntityInventoryComponent;

        const itemStack = new ItemStack("gabrielaplok:m67_grenade", 3);
        itemStack.lockMode = ItemLockMode.slot
        inventory.container?.setItem(2, itemStack)

        if (team == Team.Blue) {
            const itemStack = new ItemStack("gunfight_arena:wire_stripper", 1);
            itemStack.lockMode = ItemLockMode.slot
            inventory.container?.setItem(3, itemStack)
        }
    }

    static send(player: Player) {
        const prop = Property.entity(player);
        this.sendWeapon(player, prop.get('main_weapon').value as number, prop.get('secondary_weapon').value as number);
        this.sendArmor(player, prop.get('team').value as Team);
        this.sendTeamEquipment(player, prop.get('team').value as Team)
        player.sendMessage("§aYour weapons and gear have been delivered.");
    }

}