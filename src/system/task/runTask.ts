import { Task } from "./task";

import Property from "../../property/_handler";
import ModeManager from "../../game/modes/_manager";
import { DroppedBombHandler } from "../../game/bomb/droppedBomb";

import { Mode, Team } from "../../declare/enums";
import { EquipmentSlot, HudElement, world } from "@minecraft/server";
import PTeamScore from "../../property/world/team_score";
import { TeamUtils } from "../../utils/team";

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
}

namespace RealTimeTask {
    export function HandItemDetect() {
        for (const player of world.getAllPlayers()) {
            const handItem = player.getComponent('equippable')?.getEquipment(EquipmentSlot.Mainhand)

            if (handItem === undefined) continue;

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

    export function RotateDroppedBomb() {
        const bomb = DroppedBombHandler.instance.getBomb();
        if (bomb === undefined) return;

        const rotate = bomb.getRotation();
        rotate.y += 20;
        bomb.setRotation(rotate);
    }

    export function UpdateInfoScreen() {

        for (const player of world.getAllPlayers()) {
            
            const formatTime = (sec: number) => {
                if (sec <= 0) return "0:00";
                const minutes = Math.floor(sec / 60);
                const remainingSeconds = sec % 60;
                return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            }
            
            const statusList = [
                'Waiting for players...',
                'Starting in seconds...',
                'In Battle.            ',
                'Bomb has been planted.',
                'Round end.            ',
                'GameOver.             '
            ]
            const pteam = Property.world().get('team_score') as PTeamScore
            const [blueTeamScore, redTeamScore] = [pteam.getTeamScore(Team.Blue), pteam.getTeamScore(Team.Red)]
            
            const [blueTeamPlayer, redTeamPlayer] = [
                TeamUtils.getPlayers(Team.Blue, world.getAllPlayers()),
                TeamUtils.getPlayers(Team.Red, world.getAllPlayers()),
            ];

            let aliveText = " §l§f-----\n";
            for (const player of blueTeamPlayer) {
                const alive = Property.entity(player).get('alive').value;
                aliveText += `  ${alive ? '§a+' : '§7-'} ${alive ? '§b' : '§7'}${player.name}\n`;
            }

            aliveText += " §l§f-----\n";
            for (const player of redTeamPlayer) {
                const alive = Property.entity(player).get('alive').value;
                aliveText += `  ${alive ? '§a+' : '§7-'} ${alive ? '§c' : '§7'}${player.name}\n`;
            }
            aliveText += " §l§f-----";

            const mode = ModeManager.getMode(Property.world().get('game_mode').value as Mode);

            const rawMessage = {
                "rawtext": [
                    { "text": "§l§dGunfight Arena§r                  \n\n" },
                    { "text": ` §eState:\n` },
                    { "text": `  §e${statusList[mode.getCurrentState() as number]}\n\n` },
                    { "text": ` §fScore: §b${blueTeamScore} §f| §c${redTeamScore} §f| §aTime: ${formatTime(mode.timer)}§r\n` },
                    { "text": `\n` },
                    { "text": aliveText }
                ]
            }

            player.onScreenDisplay.setTitle(rawMessage);
        }
    }

    export function StepSound() {
        for(const player of world.getAllPlayers()) {
            if (player.isSneaking) continue;
            if (!player.isSprinting) continue; 
            
            world.getAllPlayers()
                .filter(p=> p.name !== player.name)
                .forEach(p=> p.playSound("step.stone", {location: player.location, volume: 2}));
        }
    }
}

export default function runTask() {

    const tasks: Array<[() => void, number]> = [
        [PrimaryTask.GameTick, 20],
        [PrimaryTask.PlayerEffect, 20],

        [RealTimeTask.HandItemDetect, 1],
        [RealTimeTask.RotateDroppedBomb, 4],
        [RealTimeTask.UpdateInfoScreen, 1],
        [RealTimeTask.StepSound, 6]
    ];

    for (const [func, t] of tasks)
        new Task(func, t).run();
}