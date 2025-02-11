import Demolition from "./_handler";
import Property from "../../../property/_handler";

import config from "../../../config";

import { PlayerUtils } from "../../../utils/player";
import { IState } from "../../../declare/types"
import { States, Team } from "../../../declare/enums";

import { Player } from "@minecraft/server";
import { BroadcastUtils } from "../../../utils/broadcast";

export default class Waiting implements IState {

    private get base() { return Demolition.instance; }
    readonly STATE_ID = States.Demolition.Waiting;

    entry() {
        this.base.setTimer(config.demolition.timer.waiting);
        this.base.setCurrentState(this.STATE_ID);
    }

    update() {
        for (const player of this.base.players)
            player.onScreenDisplay.setActionBar(`Next Round will start in ${this.base.timer} seconds.`);
        if (this.base.timer <= 0) this.exit();
    }

    exit() {
        const teamScore = Property.world().get('team_score');
        if (teamScore.getTeamScore(Team.Red) + teamScore.getTeamScore(Team.Blue) === config.demolition.winningScore - 1) 
            swapTeam(this.base.players);

        this.base.players.forEach(pl => PlayerUtils.respawn(pl));

        this.base.getState(States.Demolition.Preparation).entry();
    }
}

function swapTeam(players: Player[]) {
    for (const pl of players) {
        const origin = Property.entity(pl).get('team').value as Team;
        Property.entity(pl).get('team').update((origin === Team.Blue ? Team.Red : (origin === Team.Red ? Team.Blue : Team.None)));
    }
    const pteam = Property.world().get('team_score');
    const [blueTeamScore, redTeamScore] = [pteam.getTeamScore(Team.Blue), pteam.getTeamScore(Team.Red)];
    pteam.updateTeamScore(Team.Blue, redTeamScore);
    pteam.updateTeamScore(Team.Red, blueTeamScore);

    BroadcastUtils.message("§f---\n", "message");
    BroadcastUtils.message("§eSwitching Sides\n", "message");
    BroadcastUtils.message("§f---", "message");
}