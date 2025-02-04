import { Entity, Player } from "@minecraft/server";
import { Result } from "../../declare/types";

export abstract class BombHandlerBase {

    protected _bomb: Entity | undefined = undefined;

    getBomb() { return this._bomb; }

    summon?(arg?: any): Result;
    remove?(arg?: any): Result;

}