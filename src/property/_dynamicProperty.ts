import { Entity, Vector3, world } from "@minecraft/server";

abstract class Property {
    set(identifier: string, value?: boolean | number | string | Vector3) { }
    get(identifier: string) { }
    getAll() { }
}

class WorldProperty extends Property {

    set(identifier: string, value?: boolean | number | string | Vector3) { world.setDynamicProperty(identifier, value) }

    get(identifier: string) { return world.getDynamicProperty(identifier) }

    getAll() { return world.getDynamicPropertyIds() }

}

class EntityProperty extends Property {

    constructor(private target: Entity) { super() }

    set(identifier: string, value?: boolean | number | string | Vector3) { this.target.setDynamicProperty(identifier, value) }

    get(identifier: string) { return this.target.getDynamicProperty(identifier) }

    getAll() { return this.target.getDynamicPropertyIds() }

}
export { WorldProperty, EntityProperty }