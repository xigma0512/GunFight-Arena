import { Entity, Player } from "@minecraft/server";
import { Result } from "../../declare/types";

export abstract class BombHandlerBase {

    protected _bomb: Entity | undefined = undefined;

    getBomb() { return this._bomb; }

    kill() {
        this._bomb?.remove();
        this._bomb = undefined;
    }

    summon?(arg?: any): Result;
    remove?(arg?: any): Result;
}