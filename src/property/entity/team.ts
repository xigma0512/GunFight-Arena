import { Entity } from "@minecraft/server"
import { EntityProperty } from "../_dynamicProperty"
import { Team } from "../../declare/enums"

import { IProperty } from "../../declare/types"

export default class PTeam implements IProperty {

    readonly propertyId = "team"

    private dp: EntityProperty

    constructor(private entity: Entity) {
        this.dp = new EntityProperty(this.entity)
        if (this.dp.get(this.propertyId) === undefined) this.dp.update(this.propertyId, Team.None)
    }
    get value() { return this.dp.get(this.propertyId) as Team }
    update = (value: Team) => this.dp.update(this.propertyId, value)
}