import { Entity, world } from "@minecraft/server";
import { PropertyDataType } from "../declare/types";

abstract class Property {
    get(identifier: string) { }
    update(identifier: string, value?: PropertyDataType) { }
}

class WorldProperty implements Property {
    get(identifier: string) { return world.getDynamicProperty(identifier) }
    update(identifier: string, value?: PropertyDataType) { world.setDynamicProperty(identifier, value) }
}

class EntityProperty implements Property {
    constructor(private target: Entity) { }
    get(identifier: string) { return this.target.getDynamicProperty(identifier) }
    update(identifier: string, value?: PropertyDataType) { this.target.setDynamicProperty(identifier, value) }
}
export { WorldProperty, EntityProperty }