import { Entity } from "@minecraft/server"
import { IProperty } from "../../declare/types"

export default class PSecondaryWeapon implements IProperty {

    readonly propertyId = "secondary_weapon"

    constructor(private entity: Entity) {
        if (this.entity.getDynamicProperty(this.propertyId) === undefined)
            this.entity.setDynamicProperty(this.propertyId, 8);
    }

    get value() { return this.entity.getDynamicProperty(this.propertyId) as number }
    update = (value = 8) => this.entity.setDynamicProperty(this.propertyId, value);
}