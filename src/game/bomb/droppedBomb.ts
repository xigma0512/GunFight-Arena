import { Vector3, world } from "@minecraft/server";
import { BombHandlerBase } from "./baseHandler";
import { ConsoleUtils } from "../../utils/console";

export class DroppedBombHandler extends BombHandlerBase {

    private static _instance: DroppedBombHandler;
    static get instance() { return (this._instance || (this._instance = new this())); }

    override summon(location: Vector3) {
        if (this._bomb !== undefined)
            return ConsoleUtils.warn("Cannot SUMMON dropped bomb because it wasn't undefined.");

        try { this._bomb = world.getDimension('overworld').spawnEntity('gunfight_arena:dropped_bomb', location); }
        catch (err: any) { ConsoleUtils.error(err); }

        ConsoleUtils.success("Successfully SUMMON dropped bomb.");
    }

    override remove() {
        if (this._bomb === undefined) return ConsoleUtils.warn("Cannot REMOVE dropped bomb because it was undefined.");
        this._bomb.remove();
        this._bomb = undefined;

        ConsoleUtils.success("Successfully REMOVE dropped bomb.");
    }

}