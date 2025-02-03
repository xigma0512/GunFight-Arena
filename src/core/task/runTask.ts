import { Task } from "./task";

import Property from "../../game/property/_handler";
import ModeManager from "../modes/_manager";

import { Mode } from "../../declare/enums";
import { EquipmentSlot, HudElement, Player, world } from "@minecraft/server";

namespace PrimaryTask {
    export function GameTick() {
        const gameMode = Property.world().get('game_mode').value as Mode;
        ModeManager.getMode(gameMode).tick();
    }

    export function PlayerEffect() {
        for (const player of world.getAllPlayers()) {
            player.addEffect('saturation', 30, { amplifier: 1, showParticles: false });
        }
    }

    export function GamePlayerDetect() {
        const gamemode = Property.world().get('game_mode').value as Mode
        for (const pl of world.getAllPlayers()) {
            if (pl.hasTag('inGame')) ModeManager.getMode(gamemode).addPlayer(pl);
            if (!pl.hasTag('inGame')) ModeManager.getMode(gamemode).removePlayer(pl);
        }
    }
}

namespace RealTimeTask {
    export function HandItemDetect() {
        for (const player of world.getAllPlayers()) {
            const handItem = player.getComponent('equippable')?.getEquipment(EquipmentSlot.Mainhand)

            if (handItem == undefined) return;

            const heavyItems = [
                { id: 'gabrielaplok:awp', amplifier: 0 },
                { id: 'gabrielaplok:m249', amplifier: 0 }
            ];

            let isSlowness = false;
            for (const info of heavyItems) {
                if (handItem.typeId !== info.id) continue;
                player.addEffect('slowness', 10, { amplifier: info.amplifier, showParticles: false });
                isSlowness = true;
                break;
            }

            if (!isSlowness) player.removeEffect('slowness');

            player.onScreenDisplay.setHudVisibility(
                Number(handItem.typeId !== 'gabrielaplok:awp'),
                [HudElement.Crosshair]
            );
        }
    }
    export function UpdateInfoScreen() {

    }
}

export default function runTask() {

    const tasks: Array<[() => void, number]> = [
        [PrimaryTask.GameTick, 20],
        [PrimaryTask.PlayerEffect, 20],
        [PrimaryTask.GamePlayerDetect, 20],

        [RealTimeTask.HandItemDetect, 1],
        [RealTimeTask.UpdateInfoScreen, 1]
    ];

    for (const [func, t] of tasks)
        new Task(func, t).run();
}