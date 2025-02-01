import Property from "../../game/property/_handler";
import PTeamScore from "../../game/property/world/team_score";

import { Mode, States, Team } from "../../declare/enums";
import config from "../../config";

import { EquipmentSlot, ItemStack, Player, world } from "@minecraft/server";
import { ItemLockMode, InputPermissionCategory, GameMode } from "@minecraft/server"
import ModeManager from "../modes/_manager";


export namespace Utils {

    export function broadcastMessage(msg: string, type: 'message' | 'actionbar') {
        for (const player of world.getAllPlayers()) {
            switch (type) {
                case 'message': player.sendMessage(msg); break;
                case 'actionbar': player.onScreenDisplay.setActionBar(msg); break;
            }
        }
    }

    export function broadcastSound(soundId: string) {
        for (const player of world.getAllPlayers()) {
            player.playSound(soundId);
        }
    }

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
            EquipmentSlot.Body,
            EquipmentSlot.Legs,
            EquipmentSlot.Feet
        ];
        for (const slot of equipmentSlot) player.getComponent('equippable')?.setEquipment(slot, undefined);
    }

    export function tp2TeamSpawn(player: Player) {
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

    export function setGameMode(player: Player, mode: 'creative' | 'survival' | 'adventure' | 'spectator') {
        player.setGameMode({
            'creative': GameMode.creative,
            'survival': GameMode.survival,
            'adventure': GameMode.adventure,
            'spectator': GameMode.spectator
        }[mode]);
    }

    export function resetGameData() {
        Property.world().get('game_mode').update(Mode.Demolition);
        ModeManager.getMode(Mode.Demolition).state = States.Demolition.Waiting;
        (Property.world().get('team_score') as PTeamScore).updateTeamScore(Team.Blue);
        (Property.world().get('team_score') as PTeamScore).updateTeamScore(Team.Red);
    }

    export function resetPlayerData(player: Player) {
        clearInventory(player);
        setMovement(player, true);
        setGameMode(player, 'adventure');
        Property.entity(player).get('alive').update();

        Property.entity(player).get('team').update(Team.None);
        tp2TeamSpawn(player);
        player.removeTag('inGame');

        for (const [_, propObject] of Object.entries(Property.entity(player).properties())) {
            propObject.update();
        }
    }

    export function respawnPlayer(player: Player) {
        clearInventory(player);
        setMovement(player, false);
        setGameMode(player, 'adventure');
        Property.entity(player).get('alive').update();

        tp2TeamSpawn(player);

        player.addEffect('health_boost', 2000000, { amplifier: 9, showParticles: false });
        player.addEffect('instant_health', 2, { amplifier: 99 });

        const item = new ItemStack('feather');
        item.lockMode = ItemLockMode.slot;
        player.getComponent('inventory')?.container?.setItem(8, item);
    }
}