import { world } from "@minecraft/server";
import { DisplaySlotId, ScoreboardObjective, WorldInitializeAfterEvent } from "@minecraft/server"

import { resetProp } from "../../../core/utils/_utils";

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