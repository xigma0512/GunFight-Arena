import { Entity } from "@minecraft/server"
import { IProperty } from "../../../declare/types"
import { EntityProperty } from "../../_dynamicProperty"

export default class PPistol implements IProperty {

    readonly propertyId = "pistol"

    private dp: EntityProperty;

    constructor(private entity: Entity) {
        this.dp = new EntityProperty(entity)
        if (this.dp.get(this.propertyId) === undefined) this.dp.update(this.propertyId, 0)
    }

    get value() { return this.dp.get(this.propertyId) as number }
    update = (value: number) => this.dp.update(this.propertyId, value)
}