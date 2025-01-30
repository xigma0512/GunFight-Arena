import { Entity } from "@minecraft/server"
import { IProperty } from "../../declare/types"

export default class PMainWeapon implements IProperty {

    readonly propertyId = "main_weapon"

    constructor(private entity: Entity) {
        if (this.entity.getDynamicProperty(this.propertyId) === undefined)
            this.entity.setDynamicProperty(this.propertyId, 0);
    }

    get value() { return this.entity.getDynamicProperty(this.propertyId) as number }
    update = (value = 0) => this.entity.setDynamicProperty(this.propertyId, value);
}