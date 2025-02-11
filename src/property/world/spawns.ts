import { IProperty, ISpawnConfig } from "../../declare/types";
import { Vector3, world } from "@minecraft/server";

const blank: ISpawnConfig = {
    lobby: { x: 0, y: 0, z: 0 },
    blue: { x: 0, y: 0, z: 0 },
    red: { x: 0, y: 0, z: 0 },
    bomb: { x: 0, y: 0, z: 0 },
    bomb_targets: [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
    ]
}

export default class PSpawns implements IProperty {

    readonly propertyId = "spawns"

    constructor() {
        if (world.getDynamicProperty(this.propertyId) === undefined)
            world.setDynamicProperty(this.propertyId, JSON.stringify(blank));
    }
    get value() { return world.getDynamicProperty(this.propertyId) as string }
    update = (value = JSON.stringify(blank)) => world.setDynamicProperty(this.propertyId, value);

    get(option: keyof ISpawnConfig) {
        const config = JSON.parse(this.value) as ISpawnConfig;
        return config[option];
    }

    set(option: keyof ISpawnConfig, value: Vector3) {
        const config = JSON.parse(this.value) as ISpawnConfig;
        if (option === 'bomb_targets') config.bomb_targets.push(value);
        else config[option] = value;

        this.update(JSON.stringify(config));
    }
}
export { PSpawns }