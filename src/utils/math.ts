import { Vector3 } from "@minecraft/server";

export abstract class MathUtils {
    static distance(from: Vector3, to: Vector3) {
        return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2) + Math.pow(to.z - from.z, 2));
    }
}