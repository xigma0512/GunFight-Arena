import { WorldProperty } from "../_dynamicProperty";

import { IProperty } from "../../declare/types";
import { Team } from "../../declare/enums";

interface ITeamScore {
    red: number;
    blue: number;
}

class PTeamScore implements IProperty {

    readonly propertyId = "team_score"

    private dp = new WorldProperty()

    constructor() {
        if (this.dp.get(this.propertyId) === undefined) this.dp.update(this.propertyId, '{}')
    }
    get value() { return this.dp.get(this.propertyId) as string }
    update = (value: string) => this.dp.update(this.propertyId, value)

    getTeamScore(t: Team): number {
        const scoreTable = JSON.parse(this.value) as ITeamScore
        if (t == Team.Red) return scoreTable.red
        if (t == Team.Blue) return scoreTable.blue
        return -1
    }
    updateTeamScore(t: Team, value: number) {
        const scoreTable = JSON.parse(this.value) as ITeamScore
        if (t == Team.Red) scoreTable.red = value
        if (t == Team.Blue) scoreTable.blue = value
        this.update(JSON.stringify(scoreTable))
    }
}
export { PTeamScore }