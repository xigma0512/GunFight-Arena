import { system } from "@minecraft/server";

export class Task {
    private _id: number = -1;
    constructor(
        private readonly _job: () => void,
        private readonly _tickingTime: number
    ) { }
    run() { this._id = system.runInterval(this._job, this._tickingTime); }
    kill() { system.clearRun(this._id); }
}