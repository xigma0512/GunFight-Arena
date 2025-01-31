import { IProperty } from "../../declare/types";

import { Entity } from "@minecraft/server";

export default class PAlive implements IProperty {

    readonly propertyId = "alive"

    constructor(private entity: Entity) {
        if (this.entity.getDynamicProperty(this.propertyId) === undefined)
            this.entity.setDynamicProperty(this.propertyId, true);
    }
    get value() { return this.entity.getDynamicProperty(this.propertyId) as boolean }
    update = (value = true) => this.entity.setDynamicProperty(this.propertyId, value);
}