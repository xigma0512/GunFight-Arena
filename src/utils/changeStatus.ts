import { GameMode, InputPermissionCategory, Player, system } from "@minecraft/server";

import { Status, Team } from "../declare/enums";

import { PropertyManager } from "../property/_manager";
import { giveArmor, giveWeapon } from "./weapon/give";
import { toLobby, toTeamSpawn } from "./teleport";
import { setTickingTime } from "../system/primary/_primary";
import { resetProp } from "./reset";

const changeStatus = (next: Status, players: Player[], winner?: Team) => {
    switch (next) {
        case Status.Waiting:
            players.forEach(p => {
                resetProp();
                p.getComponent('inventory')?.container?.clearAll();
                p.setGameMode(GameMode.adventure)
                toLobby(p);
            })
            break;

        case Status.Preparing:
            setTickingTime(10);
            players.forEach(p => {
                const team = PropertyManager.entity(p).get('team').value as Team

                p.addEffect('invisibility', 300, { amplifier: 255, showParticles: false })
                p.addEffect('resistance', 300, { amplifier: 255, showParticles: false })
                p.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, false)

                p.getComponent('inventory')?.container?.clearAll();
                p.setGameMode(GameMode.adventure)
                toTeamSpawn(p, team)
                p.sendMessage(`You are ${team == Team.Blue ? '§1BLUE Team' : '§cRED Team'}`)
                p.sendMessage("Teleport to team spawnpoint.")
            })
            break;

        case Status.Running:
            setTickingTime(600)
            players.forEach(p => {
                const [team, main_weapon, pistol] = [
                    PropertyManager.entity(p).get('team').value as Team,
                    PropertyManager.entity(p).get('main_weapon').value as number,
                    PropertyManager.entity(p).get('pistol').value as number
                ]

                p.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, true)
                p.sendMessage("Game Start!")
                giveArmor(p, team)
                giveWeapon(p, main_weapon, pistol)
                p.sendMessage("Your weapons and gear have been delivered.")
            })
            break;

        case Status.GameOver:
            setTickingTime(15)
            if (winner == undefined)
                return console.warn("winner should not be undefined")

            players.forEach(p => {
                p.getComponent('inventory')?.container?.clearAll();
                p.setGameMode(GameMode.spectator)
                p.sendMessage('§l§a- GAMEOVER -')
                p.sendMessage(`§l${(winner == Team.Blue ? "§l§bBlue Team" : "§l§cRed Team")} §eis the winner!`)
            })
            break;
    }
    PropertyManager.world().get('game_status').update(next)
}
export { changeStatus }