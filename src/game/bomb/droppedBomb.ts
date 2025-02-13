import { BombHandlerBase } from "./baseHandler";
import { ConsoleUtils } from "../../utils/console";
import { Result } from "../../declare/types";
import Property from "../../property/_handler";
import { Team } from "../../declare/enums";

import { ItemStack, Player, Vector3, world } from "@minecraft/server";
import { EntityInventoryComponent } from "@minecraft/server";

export class DroppedBombHandler extends BombHandlerBase {

    private static _instance: DroppedBombHandler;
    static get instance() { return (this._instance || (this._instance = new this())); }

    override summon(location: Vector3): Result {
        if (this._bomb !== undefined) {
            ConsoleUtils.warn("Cannot SUMMON dropped bomb because it wasn't undefined.");
            return [false, ""];
        }

        try { this._bomb = world.getDimension('overworld').spawnEntity('gunfight_arena:dropped_bomb', location); }
        catch (err: any) {
            ConsoleUtils.error(err);
            return [false, ""];
        }

        ConsoleUtils.success("Successfully SUMMON dropped bomb.");
        return [true, ""];
    }

    override remove(owner: Player): Result {
        if (this._bomb === undefined) {
            ConsoleUtils.warn("Cannot REMOVE dropped bomb because it was undefined.");
            return [false, ""];
        }

        if (Property.entity(owner).get('team').value !== Team.Red)
            return [false, ""];

        this._bomb.remove();
        this._bomb = undefined;

        (owner.getComponent('inventory') as EntityInventoryComponent).container?.addItem(new ItemStack("gunfight_arena:c4"));

        ConsoleUtils.success("Successfully REMOVE dropped bomb.");
        return [true, ""];
    }

}