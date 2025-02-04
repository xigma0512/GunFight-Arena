import { Entity, Vector3 } from "@minecraft/server";

export abstract class BombHandlerBase {

    protected _bomb: Entity | undefined;

    getBomb() { return this._bomb; }

    summon?(location: Vector3): void;
    remove?(): void;

}