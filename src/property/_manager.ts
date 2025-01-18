import { Entity } from "@minecraft/server";
import { IProperty } from "../declare/types";
// World Property
import { PTeamScore } from "./world/team_score";
import { PGameStatus } from "./world/game_status";
// Entity Property
import { PTeam } from "./entity/team";
import { PMainWeapon } from "./entity/weapon/main_weapon";
import { PPistol } from "./entity/weapon/pistol";
import { PGameMode } from "./world/game_mode";

class WorldPropertyManager {
    private propertyTable: Record<string, IProperty>;
    constructor() {
        this.propertyTable = {
            "team_score": new PTeamScore,
            "game_status": new PGameStatus,
            "game_mode": new PGameMode
        }
    }
    properties = () => this.propertyTable
    get = (propertyId: keyof typeof this.propertyTable) => this.propertyTable[propertyId]
}

class EntityPropertyManager {
    private propertyTable: Record<string, IProperty>;
    constructor(private entity: Entity) {
        this.propertyTable = {
            "team": new PTeam(this.entity),
            "main_weapon": new PMainWeapon(this.entity),
            "pistol": new PPistol(this.entity)
        }
    }
    properties = () => this.propertyTable
    get = (propertyId: keyof typeof this.propertyTable) => this.propertyTable[propertyId]
}


abstract class PropertyManager {
    static world = () => new WorldPropertyManager
    static entity = (entity: Entity) => new EntityPropertyManager(entity)
}

export { PropertyManager }