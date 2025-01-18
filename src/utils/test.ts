import { EquipmentSlot, system, world } from "@minecraft/server";
import { giveWeapon } from "./weapon/give";
import { PropertyManager } from "../property/_manager";

export function test() {
    world.getAllPlayers().forEach(p => {
        giveWeapon(p, PropertyManager.entity(p).get('main_weapon').value as number, PropertyManager.entity(p).get('pistol').value as number)
        // system.runInterval(() => p.sendMessage(p.getComponent('equippable')?.getEquipment(EquipmentSlot.Mainhand)?.typeId ?? "undefined"), 20)
    })
}