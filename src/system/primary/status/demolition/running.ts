import { world } from "@minecraft/server"
import { PropertyManager } from "../../../../property/_manager"
import { Status, Team } from "../../../../declare/enums"
import config from "../../../../config";
import PTeamScore from "../../../../property/world/team_score";
import { changeStatus } from "../../../../utils/changeStatus";

const running = (tickingTime: number) => {
    const teamPlayers = (t: Team) =>
        world.getAllPlayers().filter(p => PropertyManager.entity(p).get('team').value === t);
    const pteam = PropertyManager.world().get("team_score") as PTeamScore

    const [blueTeamPlayers, redTeamPlayers] = [teamPlayers(Team.Blue), teamPlayers(Team.Red)];
    const [blueTeamScore, redTeamScore] = [pteam.getTeamScore(Team.Blue), pteam.getTeamScore(Team.Red)]

    // if blue and red get win score at the same time, blue team will be the winner
    if (tickingTime <= 590)
        if (blueTeamPlayers.length == 0 || blueTeamScore >= config.deathMatch.winningScore)
            changeStatus(Status.GameOver, world.getAllPlayers(), Team.Blue)
        else if (redTeamPlayers.length == 0 || redTeamScore >= config.deathMatch.winningScore)
            changeStatus(Status.GameOver, world.getAllPlayers(), Team.Red)

    if (tickingTime <= 0)
        changeStatus(Status.GameOver, world.getAllPlayers(), (blueTeamScore >= redTeamScore ? Team.Blue : Team.Red))
}
export { running }