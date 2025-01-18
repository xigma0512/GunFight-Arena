import { world } from "@minecraft/server";
import { GameMode, Status, Team } from "../declare/enums"
import { PropertyManager } from "../property/_manager"
import { PTeamScore } from "../property/world/team_score"

const resetProp = () => {
    PropertyManager.world().get('game_mode').update(GameMode.DeathMatch);
    PropertyManager.world().get('game_status').update(Status.Waiting);
    (PropertyManager.world().get('team_score') as PTeamScore).updateTeamScore(Team.Blue, 0);
    (PropertyManager.world().get('team_score') as PTeamScore).updateTeamScore(Team.Red, 0);
    world.getAllPlayers().forEach(p => {
        PropertyManager.entity(p).get('team').update(Team.None)
    })
}
export { resetProp }