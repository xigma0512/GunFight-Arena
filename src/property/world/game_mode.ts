import { WorldProperty } from "../_dynamicProperty";

import { IProperty } from "../../declare/types";
import { GameMode, Status } from "../../declare/enums";

export default class PGameMode implements IProperty {

    readonly propertyId = "game_mode"

    private dp = new WorldProperty()

    constructor() {
        if (this.dp.get(this.propertyId) === undefined) this.dp.update(this.propertyId, GameMode.Demolition)
    }
    get value() { return this.dp.get(this.propertyId) as GameMode }
    update = (value: GameMode) => this.dp.update(this.propertyId, value)
}
export { PGameMode }