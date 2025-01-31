import { IStateHandler } from "../../declare/types";

import { Player } from "@minecraft/server";

export class ModeHandler {
    constructor(
        private _time: number,
        private _players: Player[],
        private readonly _handlers: IStateHandler[]
    ) { }

    get time() { return this._time; }
    get players() { return this._players; }
    get handlers() { return this._handlers; }

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

    protected tick?(): void;
}