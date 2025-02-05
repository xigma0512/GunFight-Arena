import { BombHandlerBase } from "./baseHandler";
import { ConsoleUtils } from "../../utils/console";
import { MathUtils } from "../../utils/math";

import config from "../../config";
import { Result } from "../../declare/types";

import { ItemStack, Player, world } from "@minecraft/server";

export class PlantedBombHandler extends BombHandlerBase {

    private static _instance: PlantedBombHandler;
    static get instance() { return (this._instance || (this._instance = new this())); }

    override summon(owner: Player): Result {

        const [bombPoints, range] = [
            config.demolition.bomb.bomb_point,
            config.demolition.bomb.bomb_point_range
        ];

        let inRange = false;
        for (const [pointName, point] of Object.entries(bombPoints)) {
            if (MathUtils.distance(point, owner.location) > range) continue;
            inRange = true;
        }
        if (!inRange) {
            owner.getComponent("inventory")?.container?.addItem(new ItemStack("gunfight_arena:c4"));

            return [false, "You are not in bomb position."];
        }

        if (this._bomb !== undefined) {
            ConsoleUtils.warn("Cannot SUMMON planted bomb because it wasn't undefined.");
            return [false, ""];
        }

        try { this._bomb = world.getDimension('overworld').spawnEntity('gunfight_arena:planted_bomb', owner.location); }
        catch (err: any) {
            ConsoleUtils.error(err);
            return [false, ""];
        }

        ConsoleUtils.success("Successfully SUMMON planted bomb.");
        return [true, ''];
    }

    override remove(owner: Player): Result {

        if (this._bomb === undefined) {
            ConsoleUtils.warn("Cannot REMOVE planted bomb because it was undefined.");
            return [false, "Cannot found C4."];
        }

        if (MathUtils.distance(this._bomb.location, owner.location) > 1.2) {
            return [false, "Cannot found C4 in this position."];
        }

        this._bomb.kill();
        this._bomb = undefined;

        ConsoleUtils.success("Successfully REMOVE planted bomb.");
        return [true, ""];
    }

}