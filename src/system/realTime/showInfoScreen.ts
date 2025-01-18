import { Player } from "@minecraft/server"
import { PropertyManager } from "../../property/_manager"
import { getTickingTime } from "../primary/_primary"
import { PTeamScore } from "../../property/world/team_score";
import { Team } from "../../declare/enums";

function formatTime(sec: number) {
    if (sec <= 0) return "0:00";
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

const showInfoScreen = (player: Player) => {
    const statusList = [
        'Waiting for players...      ',
        'Starting in a few seconds.        ',
        'In Battle    ',
        'The game is over.    '
    ]
    const pstatus = PropertyManager.world().get('game_status');
    const pteam = PropertyManager.world().get('team_score') as PTeamScore
    const [blueTeamScore, redTeamScore] = [pteam.getTeamScore(Team.Blue), pteam.getTeamScore(Team.Red)]

    const rawMessage = {
        "rawtext": [
            { "text": "        §l§dGunfight Arena§r        \n\n" },
            { "text": ` §eStatus: ${statusList[pstatus.value as number]}\n` },
            { "text": ` §aTime: ${formatTime(getTickingTime())}§r\n` },
            { "text": ` §fScore: §b${blueTeamScore} §f| §c${redTeamScore}\n\n` },
            { "text": `§l§oCredits§r\n` },
            { "text": ` §cGame Design §bby §7@xigma0512      \n` },
            { "text": ` §cGun Models §bby §7@GabrielAplok      \n` },
            { "text": ` §cMap §bCreating by §7@_Codre_      \n` },
            { "text": `       §bPorting by §7@AzozGamer936      ` },
        ]
    }
    player.onScreenDisplay.setTitle(rawMessage)
}
export { showInfoScreen }