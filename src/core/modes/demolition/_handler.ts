import WaitingHanlder from "./waiting"
import PreparingHandler from "./preparing";
import RunningHandler from "./running";
import GameOverHanlder from "./gameover";
import SleepingHanlder from "./sleeping";
import BombPlantedHandler from "./bombPlanted";

import { States } from "../../../declare/enums";

import { ModeHandler } from "../modeHandler";
import { Entity } from "@minecraft/server";

export default class Demolition extends ModeHandler {

    private static _instance: Demolition;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private _state: States.Demolition;
    private _c4: Entity | undefined;

    get state() { return this._state; }
    set state(s: States.Demolition) { this._state = s; }

    getBomb() { return this._c4; }
    setBomb(entity: Entity | undefined) { this._c4 = entity; }

    constructor() {
        super(-1, [], [
            new WaitingHanlder,
            new PreparingHandler,
            new RunningHandler,
            new GameOverHanlder,
            new SleepingHanlder,
            new BombPlantedHandler
        ]);
        this._state = States.Demolition.Waiting;
    }

    override tick() {
        this.handlers[this.state].update();
        this.time--;
    }

}