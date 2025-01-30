import { IProperty } from "../../declare/types";
import { Team } from "../../declare/enums";
import { world } from "@minecraft/server";

interface ITeamScore {
    red: number;
    blue: number;
}

export default class PTeamScore implements IProperty {

    readonly propertyId = "team_score"

    constructor() {
        if (world.getDynamicProperty(this.propertyId) === undefined)
            world.setDynamicProperty(this.propertyId, '{}');
    }
    get value() { return world.getDynamicProperty(this.propertyId) as string }
    update = (value: string) => world.setDynamicProperty(this.propertyId, value);

    getTeamScore(t: Team): number {
        const scoreTable = JSON.parse(this.value) as ITeamScore
        if (t == Team.Red) return scoreTable.red
        if (t == Team.Blue) return scoreTable.blue
        return -1;
    }

    updateTeamScore(t: Team, value: number) {
        const scoreTable = JSON.parse(this.value) as ITeamScore
        if (t == Team.Red) scoreTable.red = value
        if (t == Team.Blue) scoreTable.blue = value
        this.update(JSON.stringify(scoreTable))
    }
}