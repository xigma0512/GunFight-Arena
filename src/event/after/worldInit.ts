import { world } from "@minecraft/server";
import { DisplaySlotId, ScoreboardObjective, WorldInitializeAfterEvent } from "@minecraft/server"

import { PropertyManager } from "../../property/_manager";
import { EGameMode, Team, Status } from "../../declare/enums";
import PTeamScore from "../../property/world/team_score";

export default abstract class worldInit {
    static subscribe = () => {
        return world.afterEvents.worldInitialize.subscribe(ev => {
            resetProp();

            if (world.scoreboard.getObjective('main_weapon') === undefined) world.scoreboard.addObjective('main_weapon');
            if (world.scoreboard.getObjective('pistol') === undefined) world.scoreboard.addObjective('pistol');
            if (world.scoreboard.getObjective('team') === undefined) world.scoreboard.addObjective('team', 'TEAM');

            world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.List, { 'objective': world.scoreboard.getObjective('team') as ScoreboardObjective })
            world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, { 'objective': world.scoreboard.getObjective('team') as ScoreboardObjective })

            console.warn("world initialize")
        })
    }
    static unsubscribe = (ev: (args: WorldInitializeAfterEvent) => void) => world.afterEvents.playerSpawn.unsubscribe(ev)
}

function resetProp() {
    PropertyManager.world().get('game_mode').update(EGameMode.DeathMatch);
    PropertyManager.world().get('game_status').update(Status.Waiting);
    (PropertyManager.world().get('team_score') as PTeamScore).updateTeamScore(Team.Blue, 0);
    (PropertyManager.world().get('team_score') as PTeamScore).updateTeamScore(Team.Red, 0);
}