import { Mode } from "../declare/enums";
import Demolition from "./demolition/_handler";

export default abstract class ModeManager {
    static readonly modes = [
        Demolition.instance
    ];
    static getMode(index: Mode) {
        return this.modes[index];
    }
}