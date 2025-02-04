import { Vector3, world } from "@minecraft/server";
import { BombHandlerBase } from "./baseHandler";
import { ConsoleUtils } from "../../utils/console";

export class PlantedBombHandler extends BombHandlerBase {

    private static _instance: PlantedBombHandler;
    static get instance() { return (this._instance || (this._instance = new this())); }

    override summon(location: Vector3) {
        if (this._bomb !== undefined)
            return ConsoleUtils.warn("Cannot SUMMON planted bomb because it wasn't undefined.");

        try { this._bomb = world.getDimension('overworld').spawnEntity('gunfight_arena:planted_bomb', location); }
        catch (err: any) { ConsoleUtils.error(err); }

        ConsoleUtils.success("Successfully SUMMON planted bomb.");
    }

    override remove() {
        if (this._bomb === undefined) return ConsoleUtils.warn("Cannot REMOVE planted bomb because it was undefined.");
        this._bomb.kill();
        this._bomb = undefined;

        ConsoleUtils.success("Successfully REMOVE planted bomb.");
    }

}