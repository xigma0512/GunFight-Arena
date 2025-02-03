import Property from "../../game/property/_handler";
import { Team } from "../../declare/enums";
import config from "../../config";
import { Player, ItemStack } from "@minecraft/server";
import { InputPermissionCategory, EquipmentSlot, GameMode, ItemLockMode } from "@minecraft/server";

export namespace PlayerUtils {
    export function setMovement(player: Player, state: boolean) {
        [
            InputPermissionCategory.MoveForward,
            InputPermissionCategory.MoveBackward,
            InputPermissionCategory.MoveLeft,
            InputPermissionCategory.MoveRight
        ].forEach(inputPermission => player.inputPermissions.setPermissionCategory(inputPermission, state));
    }

    export function clearInventory(player: Player) {
        player.getComponent('inventory')?.container?.clearAll();
        const equipmentSlot = [
            EquipmentSlot.Head,
            EquipmentSlot.Chest,
            EquipmentSlot.Legs,
            EquipmentSlot.Feet
        ];
        for (const slot of equipmentSlot) player.getComponent('equippable')?.setEquipment(slot, undefined);
    }

    export function setGameMode(player: Player, mode: 'creative' | 'survival' | 'adventure' | 'spectator') {
        player.setGameMode({
            'creative': GameMode.creative,
            'survival': GameMode.survival,
            'adventure': GameMode.adventure,
            'spectator': GameMode.spectator
        }[mode]);
    }

    export function tp2Spawn(player: Player) {
        const team = Property.entity(player).get('team').value as Team;

        switch (team) {
            case Team.Blue: player.teleport(config.demolition.spawn_point.blue_team); break;
            case Team.Red: player.teleport(config.demolition.spawn_point.red_team); break;
            case Team.None:
            default:
                player.teleport(config.lobby_spawn);
                break;
        }
    }

    export function respawn(player: Player) {
        clearInventory(player);
        setMovement(player, false);
        setGameMode(player, 'adventure');
        Property.entity(player).get('alive').update();

        tp2Spawn(player);

        player.addEffect('health_boost', 2000000, { amplifier: 9, showParticles: false });
        player.addEffect('instant_health', 2, { amplifier: 99 });

        player.nameTag = "";

        const item = new ItemStack('feather');
        item.lockMode = ItemLockMode.slot;
        player.getComponent('inventory')?.container?.setItem(8, item);
    }
}