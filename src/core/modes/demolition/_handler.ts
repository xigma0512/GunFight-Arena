import WaitingHanlder from "./waiting"
import PreparingHandler from "./preparing";
import RunningHandler from "./running";
import GameOverHanlder from "./gameover";
import SleepingHanlder from "./sleeping";
import BombPlantedHandler from "./bombPlanted";

import { States } from "../../../declare/enums";

import ModeHandlerBase from "../base/_handler";
import { Entity } from "@minecraft/server";

export default class Demolition extends ModeHandlerBase {

    private static _instance: Demolition;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private _currentState: States.Demolition;
    private _c4: Entity | undefined;

    constructor() {
        super(-1, [], [
            new WaitingHanlder,
            new PreparingHandler,
            new RunningHandler,
            new GameOverHanlder,
            new SleepingHanlder,
            new BombPlantedHandler
        ]);
        this._currentState = States.Demolition.Waiting;
    }

    getCurrentState() { return this._currentState; }
    setCurrentState(state: States.Demolition) { this._currentState = state; }

    getBomb() { return this._c4; }
    registerBomb(entity: Entity) { this._c4 = entity; }
    unRegisterBomb() { this._c4 = undefined; }

    override tick() {
        this.getState(this._currentState).update();
        this.setTimer(this.timer - 1);
    }

}