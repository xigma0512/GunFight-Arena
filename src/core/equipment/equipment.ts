import config from "../../config";
import { Team } from "../../declare/enums";
import Property from "../../game/property/_handler";
import { ItemTable } from "./table";

import { ItemStack, Player, world } from "@minecraft/server"
import { Container, EntityEquippableComponent, EntityInventoryComponent, EnchantmentType, EquipmentSlot, ItemEnchantableComponent } from "@minecraft/server";
import { ItemLockMode } from "@minecraft/server"

export default abstract class Equipment {

    private static getSpecialItem(slot: number) {
        const storage = world.getDimension('overworld').getBlock(config.special_item.container_position)
        const container = storage?.getComponent('inventory')?.container as Container
        return container.getItem(slot) as ItemStack
    }

    private static sendWeapon(player: Player, mainId: number, secondaryId: number) {
        const inventory = player.getComponent('inventory') as EntityInventoryComponent;

        const weaponInfo = ItemTable.weapon[mainId].concat(ItemTable.weapon[secondaryId])
        weaponInfo.forEach(item => {
            const [id, amount, slot] = item
            let itemStack = new ItemStack(id, amount)
            if (itemStack.typeId == "gabrielaplok:awp")
                itemStack = this.getSpecialItem(config.special_item.awp)

            itemStack.lockMode = ItemLockMode.slot
            inventory.container?.setItem(slot, itemStack)
        })

        const itemStack = new ItemStack("gabrielaplok:m67_grenade", 3)
        itemStack.lockMode = ItemLockMode.slot
        inventory.container?.setItem(2, itemStack)
    }

    private static sendArmor(player: Player, team: Team) {
        const equipment = player.getComponent("equippable") as EntityEquippableComponent;
        const armor = (team == Team.Blue ? config.special_item.blue_armor : config.special_item.red_armor)

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

    static send(player: Player) {
        const prop = Property.entity(player);
        this.sendWeapon(player, prop.get('main_weapon').value as number, prop.get('secondary_weapon').value as number);
        this.sendArmor(player, prop.get('team').value as number);
        player.sendMessage("Your weapons and gear have been delivered.");
    }

}