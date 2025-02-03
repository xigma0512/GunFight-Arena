import { States } from "../../declare/enums";
import { IState } from "../../declare/types";

import { Player } from "@minecraft/server";

export default class ModeHandlerBase {
    constructor(
        private _timer: number,
        private _players: Player[],
        private readonly _states: IState[]
    ) { }

    get timer() { return this._timer; }
    get players() { return this._players; }
    getState(state: States.Demolition) { return this._states[state]; }

    setTimer(t: number) { this._timer = t; }

    addPlayer(player: Player) {
        const index = this.players.indexOf(player);
        if (index == -1) this.players.push(player);
    }

    removePlayer(player: Player) {
        const index = this.players.indexOf(player);
        if (index == -1) return;
        this.players.splice(index, 1);
    }

    protected tick?(): void;
}