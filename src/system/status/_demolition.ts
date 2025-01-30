import { IStateHandler } from "../../declare/types";
import WaitingHanlder from "./waiting"

import { Status } from "../../declare/enums";

import { Player } from "@minecraft/server";
import PreparingHandler from "./preparing";
import RunningHandler from "./running";
import GameOverHanlder from "./gameover";

export default class Demolition {

    private static _instance: Demolition;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private _state: Status;
    private _time: number;
    private _handlers: IStateHandler[];

    protected players: Player[];

    constructor() {
        this._state = Status.Waiting;
        this._time = -1;
        this._handlers = [
            new WaitingHanlder(),
            new PreparingHandler(),
            new RunningHandler(),
            new GameOverHanlder()
        ];

        this.players = [];
    }

    tick() {
        this._handlers[this.state].update();
        this._time--;
    }

    get state() { return this._state; }
    get time() { return this._time; }
    protected set state(s: Status) { this._state = s; }
    protected set time(t: number) { this._time = t; }

}