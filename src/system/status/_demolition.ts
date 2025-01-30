import { IStateHandler } from "../../declare/types";
import WaitingHanlder from "./waiting"
import PreparingHandler from "./preparing";
import RunningHandler from "./running";
import GameOverHanlder from "./gameover";

import { Status } from "../../declare/enums";

import { Player } from "@minecraft/server";

export default class Demolition {

    private static _instance: Demolition;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private _state: Status;
    private _time: number;
    private _handlers: IStateHandler[] = [];
    private _players: Player[];

    constructor() {
        this._state = Status.Waiting;
        this._time = -1;
        this._players = [];

        this._handlers = [
            WaitingHanlder.instance,
            PreparingHandler.instance,
            RunningHandler.instance,
            GameOverHanlder.instance
        ];
    }

    tick() {
        this._handlers[this.state].update();
        this._time--;
    }

    get state() { return this._state; }
    get time() { return this._time; }
    get players() { return this._players; }

    set state(s: Status) { this._state = s; }
    set time(t: number) { this._time = t; }

    addPlayer(player: Player) {
        const index = this.players.indexOf(player);
        if (index == -1) this.players.push(player);
    }

    removePlayer(player: Player) {
        const index = this.players.indexOf(player);
        if (index == -1) return;
        this.players.splice(index, 1);
    }

}