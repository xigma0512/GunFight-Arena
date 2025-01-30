import { IProperty } from "../../declare/types";
import { EGameMode } from "../../declare/enums";
import { world } from "@minecraft/server";

export default class PGameMode implements IProperty {

    readonly propertyId = "game_mode"

    constructor() {
        if (world.getDynamicProperty(this.propertyId) === undefined)
            world.setDynamicProperty(this.propertyId, EGameMode.Demolition)
    }
    get value() { return world.getDynamicProperty(this.propertyId) as EGameMode }
    update = (value = EGameMode.Demolition) => world.setDynamicProperty(this.propertyId, value);
}
export { PGameMode }