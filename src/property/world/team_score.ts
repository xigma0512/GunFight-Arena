import { IProperty } from "../../declare/types";
import { Team } from "../../declare/enums";
import { world } from "@minecraft/server";

import { ITeamScore } from "../../declare/types";

const blank: ITeamScore = {
    red: 0,
    blue: 0
}

export default class PTeamScore implements IProperty {

    readonly propertyId = "team_score";

    constructor() {
        if (world.getDynamicProperty(this.propertyId) === undefined)
            world.setDynamicProperty(this.propertyId, JSON.stringify(blank));
    }
    get value() { return world.getDynamicProperty(this.propertyId) as string }
    update = (value: string = JSON.stringify(blank)) => world.setDynamicProperty(this.propertyId, value);

    getTeamScore(t: Team): number {
        const scoreTable = JSON.parse(this.value) as ITeamScore;
        if (t === Team.Red) return scoreTable.red;
        if (t === Team.Blue) return scoreTable.blue;
        return -1;
    }

    updateTeamScore(t: Team, newValue: number = 0) {
        const scoreTable = JSON.parse(this.value) as ITeamScore;
        if (t === Team.Red) scoreTable.red = newValue;
        if (t === Team.Blue) scoreTable.blue = newValue;
        this.update(JSON.stringify(scoreTable));
    }
}