import WaitingHanlder from "./waiting"
import PreparingHandler from "./preparing";
import RunningHandler from "./running";
import GameOverHanlder from "./gameover";

import { States } from "../../../declare/enums";

import { ModeHandler } from "../modeHandler";

export default class Demolition extends ModeHandler {

    private static _instance: Demolition;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private _state: States.Demolition;

    get state() { return this._state; }
    set state(s: States.Demolition) { this._state = s; }

    constructor() {
        super(-1, [], [
            new WaitingHanlder,
            new PreparingHandler,
            new RunningHandler,
            new GameOverHanlder
        ]);
        this._state = States.Demolition.Waiting;
    }

    override tick() {
        this.handlers[this.state].update();
        this.time--;
    }

}