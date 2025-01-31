import { IProperty } from "../../../declare/types";
import { Mode } from "../../../declare/enums";
import { world } from "@minecraft/server";

export default class PGameMode implements IProperty {

    readonly propertyId = "game_mode"

    constructor() {
        if (world.getDynamicProperty(this.propertyId) === undefined)
            world.setDynamicProperty(this.propertyId, Mode.Demolition)
    }
    get value() { return world.getDynamicProperty(this.propertyId) as Mode }
    update = (value = Mode.Demolition) => world.setDynamicProperty(this.propertyId, value);
}
export { PGameMode }