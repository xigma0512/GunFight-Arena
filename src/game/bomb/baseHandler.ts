import { Entity, Player } from "@minecraft/server";
import { Result } from "../../declare/types";
import { ConsoleUtils } from "../../utils/console";

export abstract class BombHandlerBase {

    protected _bomb: Entity | undefined = undefined;

    getBomb() { return this._bomb; }

    kill() {
        try { this._bomb?.remove(); } catch (e: any) { ConsoleUtils.error(e); }
        this._bomb = undefined;
    }

    summon?(arg?: any): Result;
    remove?(arg?: any): Result;
}