import Property from "../property/_handler";
import { Team } from "../declare/enums";

import { Player, ItemStack, Vector2, Vector3 } from "@minecraft/server";
import { InputPermissionCategory, EquipmentSlot, GameMode, ItemLockMode } from "@minecraft/server";

export abstract class PlayerUtils {
    static setMovement(player: Player, state: boolean) {
        [
            InputPermissionCategory.MoveForward,
            InputPermissionCategory.MoveBackward,
            InputPermissionCategory.MoveLeft,
            InputPermissionCategory.MoveRight
        ].forEach(inputPermission => player.inputPermissions.setPermissionCategory(inputPermission, state));
    }

    static clearInventory(player: Player) {
        player.getComponent('inventory')?.container?.clearAll();
        const equipmentSlot = [
            EquipmentSlot.Head,
            EquipmentSlot.Chest,
            EquipmentSlot.Legs,
            EquipmentSlot.Feet
        ];
        for (const slot of equipmentSlot) player.getComponent('equippable')?.setEquipment(slot, undefined);
    }

    static setGameMode(player: Player, mode: 'creative' | 'survival' | 'adventure' | 'spectator') {
        player.setGameMode({
            'creative': GameMode.creative,
            'survival': GameMode.survival,
            'adventure': GameMode.adventure,
            'spectator': GameMode.spectator
        }[mode]);
    }

    static tp2Spawn(player: Player) {
        const team = Property.entity(player).get('team').value as Team;
        const positions = Property.world().get('positions');

        switch (team) {
            case Team.Blue: player.teleport(positions.get('blue') as Vector3); break;
            case Team.Red: player.teleport(positions.get('red') as Vector3); break;
            case Team.None:
            default:
                player.teleport(positions.get('lobby') as Vector3);
                break;
        }
    }

    static respawn(player: Player) {
        this.clearInventory(player);
        this.setMovement(player, false);
        this.setGameMode(player, 'adventure');
        Property.entity(player).get('alive').update();

        this.tp2Spawn(player);

        player.addEffect('health_boost', 2000000, { amplifier: 9, showParticles: false });
        player.addEffect('instant_health', 2, { amplifier: 99 });

        player.nameTag = "";

        const item = new ItemStack('feather');
        item.lockMode = ItemLockMode.slot;
        player.getComponent('inventory')?.container?.setItem(8, item);
    }
}