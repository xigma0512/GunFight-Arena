import { WorldProperty } from "../_dynamicProperty";

import { IProperty } from "../../declare/types";
import { Status } from "../../declare/enums";

export default class PGameStatus implements IProperty {

    readonly propertyId = "game_status"

    private dp = new WorldProperty()

    constructor() {
        if (this.dp.get(this.propertyId) === undefined) this.dp.update(this.propertyId, Status.Waiting)
    }
    get value() { return this.dp.get(this.propertyId) as Status }
    update = (value: Status) => this.dp.update(this.propertyId, value)
}