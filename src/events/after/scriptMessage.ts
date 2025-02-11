import ModeManager from "../../game/modes/_manager";
import Property from "../../property/_handler";
import PTotalStat from "../../property/entity/total_stat";

import { Mode, States } from "../../declare/enums";

import { Player, ScriptEventCommandMessageAfterEvent, system, Vector3 } from "@minecraft/server";
import { ISpawnConfig } from "../../declare/types";

export default abstract class ScriptMessage {
    static subscribe = () => {
        return system.afterEvents.scriptEventReceive.subscribe(ev => {
            if (ev.sourceEntity === undefined) return;
            if (!ev.id.startsWith("gunfight_arena:")) return;

            const instance = ModeManager.getMode(Property.world().get('game_mode').value as Mode);
            const id = ev.id.replace("gunfight_arena:", "");

            switch (id) {
                case "join_queue": instance.addPlayer(ev.sourceEntity as Player); break;
                case "left_queue": instance.removePlayer(ev.sourceEntity as Player); break;
                case "game_start": instance.getState(States.Demolition.Idle).exit(); break;

                case "stat": getStat(ev.sourceEntity as Player); break;

                case "set-position": 
                    if (!ev.sourceEntity.hasTag('admin')) return;
                    settingSpawn(ev.message, ev.sourceEntity as Player);
                    break;
            }
        })
    }
    static unsubscribe = (ev: (args: ScriptEventCommandMessageAfterEvent) => void) => system.afterEvents.scriptEventReceive.unsubscribe(ev);
}

function getStat(player: Player) {

    const totalStat = Property.entity(player).get('total_stat') as PTotalStat;

    const [kills, deaths, planted, defused, wins, losts] = [
        totalStat.getStat('kills'), 
        totalStat.getStat('deaths'),
        totalStat.getStat('planted'), 
        totalStat.getStat('defused'),
        totalStat.getStat('wins'),
        totalStat.getStat('losts')
    ];

    player.sendMessage({rawtext:[
        {text: `§l§f--- §l§o§e${player.name} §aStats§r§l§f ---\n`},

        {text: `§b- §3Kills §f- §7${kills}\n`},
        {text: `§b- §3Deaths §f- §7${deaths}\n`},
        {text: `  §b- §dK/D §f- §e${kills/(deaths == 0 ? 1 : deaths)}\n`},
        
        {text: `§b- §3Wins §f- §7${wins}\n`},
        {text: `§b- §3Losts §f- §7${losts}\n`},
        {text: `  §b- §dWin Rate §f- §e${(wins/(wins+losts)) * 100}%\n`},

        {text: `§b- §3Planted §f- §7${planted}\n`},
        {text: `§b- §3Defused §f- §7${defused}\n`},

        {text: "§l§f-------"}
    ]});
}

function settingSpawn(action: string, sender: Player) {
    const spawns = Property.world().get('spawns');
    switch(action) {
        case 'clear': 
            spawns.update(); 
            sender.sendMessage("§3Successfully clear all positions setting.")
            break;
        default: 
            spawns.set(action as keyof ISpawnConfig, sender.location);
            sender.sendMessage(`§aSuccessfully set position §e"${action}"§a at §3${JSON.stringify(sender.location)}`);
    }
}