import Demolition from "./_handler"
import { ResetUtils } from "../../../utils/reset";

import config from "../../../config";

import { IState } from "../../../declare/types"
import { States } from "../../../declare/enums";
import { Player } from "@minecraft/server";
import Property from "../../../property/_handler";
import PTempStat from "../../../property/entity/temp_stat";
import PTotalStat from "../../../property/entity/total_stat";
import { BroadcastUtils } from "../../../utils/broadcast";

export default class GameOver implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.GameOver;

    entry() {
        this.base.setTimer(config.demolition.timer.gameover);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        this.base.players.forEach(pl => {
            pl.onScreenDisplay.setActionBar(`Back to the lobby in ${this.base.timer} seconds.`)
        })
        if (this.base.timer <= 0) this.exit();
    }

    exit() {
        this.base.players.forEach(pl => {
            updateStat(pl);
            ResetUtils.playerData(pl);
        });
        broadcastStat(this.base.players);
        ResetUtils.inGameData();

        this.base.getState(States.Demolition.Idle).entry();
    }

}

function updateStat(player: Player) {
    const tempStat = Property.entity(player).get('temp_stat') as PTempStat;
    const totalStat = Property.entity(player).get('total_stat') as PTotalStat;

    totalStat.updateStat('kills', totalStat.getStat("kills") + tempStat.getStat('kills'));
    totalStat.updateStat('deaths', totalStat.getStat("deaths") + tempStat.getStat('deaths'));
    totalStat.updateStat('planted', totalStat.getStat("planted") + tempStat.getStat('planted'));
    totalStat.updateStat('defused', totalStat.getStat("defused") + tempStat.getStat('defused'));
}

function broadcastStat(players: Player[]) {
    BroadcastUtils.message("§l§f--- §l§o§aPlayer Game Stats§r§l§f ---", 'message');

    for (const player of players) {
        const tempStat = Property.entity(player).get('temp_stat') as PTempStat;
        const [kills, deaths, planted, defused] = [
            tempStat.getStat('kills'), 
            tempStat.getStat('deaths'),
            tempStat.getStat('planted'), 
            tempStat.getStat('defused')
        ];

        let text = `§b- §e${player.name} §f|| `;
        text += `§bK/D: §6${kills}/${deaths} §f|| `
        text += `§bPlanted: §a${planted} §f|| `
        text += `§bDefused: §c${defused} §f||`;

        BroadcastUtils.message(text, "message");
    }
    BroadcastUtils.message("§l§f-------", 'message');
}