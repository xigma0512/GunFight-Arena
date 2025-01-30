import Demolition from "./status/_demolition";


import { PropertyManager } from "../property/_manager";
import PTeamScore from "../property/world/team_score";

import { Team } from "../declare/enums";

import { Player, world } from "@minecraft/server"
import { EntityEquippableComponent, EquipmentSlot, HudElement } from "@minecraft/server"

export default function realTimeSystenRun() {
    world.getPlayers().forEach(onlinePlayer => {
        hold_detect(onlinePlayer);
        showInfoScreen(onlinePlayer);
    });
}


function hold_detect(player: Player) {
    const equipment = player.getComponent('equippable') as EntityEquippableComponent
    const handItem = equipment.getEquipment(EquipmentSlot.Mainhand)

    if (handItem == undefined) return

    const holdAWP = handItem?.typeId == 'gabrielaplok:awp'
    if (handItem?.typeId == "gabrielaplok:m249" || holdAWP)
        player.addEffect('slowness', 10, { amplifier: 0, showParticles: false })
    else player.removeEffect("slowness")

    player.onScreenDisplay.setHudVisibility(holdAWP ? 0 : 1, [HudElement.Crosshair])
}


const showInfoScreen = (player: Player) => {

    const formatTime = (sec: number) => {
        if (sec <= 0) return "0:00";
        const minutes = Math.floor(sec / 60);
        const remainingSeconds = sec % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const statusList = [
        'Waiting for players...      ',
        'Starting in seconds...        ',
        'In Battle.    ',
        'Game Over.    '
    ]
    const pteam = PropertyManager.world().get('team_score') as PTeamScore
    const [blueTeamScore, redTeamScore] = [pteam.getTeamScore(Team.Blue), pteam.getTeamScore(Team.Red)]

    const rawMessage = {
        "rawtext": [
            { "text": "      §l§dGunfight Arena§r      \n\n" },
            { "text": `§eStatus: ${statusList[Demolition.instance.state as number]}\n` },
            { "text": `§aTime: ${formatTime(Demolition.instance.time)}§r\n` },
            { "text": `§fScore: §b${blueTeamScore} §f| §c${redTeamScore}` }
        ]
    }
    player.onScreenDisplay.setTitle(rawMessage)
}