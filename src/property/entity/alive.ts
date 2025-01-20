import { Entity } from "@minecraft/server";
import { IProperty } from "../../declare/types";
import { EntityProperty } from "../_dynamicProperty";

export default class PAlive implements IProperty {

    readonly propertyId = "alive"

    private dp: EntityProperty

    constructor(private entity: Entity) {
        this.dp = new EntityProperty(this.entity)
        if (this.dp.get(this.propertyId) === undefined) this.dp.update(this.propertyId, true)
    }
    get value() { return this.dp.get(this.propertyId) as boolean }
    update = (value: boolean) => this.dp.update(this.propertyId, value)
}