import { IProperty } from "../../declare/types"
import { Team } from "../../declare/enums"

import { Entity } from "@minecraft/server"

export default class PTeam implements IProperty {

    readonly propertyId = "team"

    constructor(private entity: Entity) {
        if (this.entity.getDynamicProperty(this.propertyId) === undefined)
            this.entity.setDynamicProperty(this.propertyId, Team.None);
    }
    get value() { return this.entity.getDynamicProperty(this.propertyId) as Team }
    update = (value = Team.None) => this.entity.setDynamicProperty(this.propertyId, Team.None);
}