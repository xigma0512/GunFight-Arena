import { Entity, World } from "@minecraft/server";
import { IProperty } from "../declare/types";

// World Property
import PTeamScore from "./world/team_score";
import PGameMode from "./world/game_mode";

// Entity Property
import PTeam from "./entity/team";
import PAlive from "./entity/alive";
import PMainWeapon from "./entity/main_weapon";
import PSecondaryWeapon from "./entity/secondary_weapon";
import PTotalStat from "./entity/total_stat";
import PTempStat from "./entity/temp_stat";

class WorldProperty {
    private _propertyTable: Record<string, IProperty>;
    constructor() {
        this._propertyTable = {
            "team_score": new PTeamScore,
            "game_mode": new PGameMode
        };
    }
    properties = () => this._propertyTable
    get = (propertyId: keyof typeof this._propertyTable) => this._propertyTable[propertyId];
}

class EntityProperty {
    private _propertyTable: Record<string, IProperty> = {

    };
    constructor(private _entity: Entity) {
        this._propertyTable = {
            "team": new PTeam(this._entity),
            "alive": new PAlive(this._entity),
            "main_weapon": new PMainWeapon(this._entity),
            "secondary_weapon": new PSecondaryWeapon(this._entity),
            "temp_stat": new PTempStat(this._entity),
            "total_stat": new PTotalStat(this._entity)
        }
    }
    properties = () => this._propertyTable;
    get = (propertyId: keyof typeof this._propertyTable) => this._propertyTable[propertyId]
}

export default abstract class Property {
    static world() { return new WorldProperty() }
    static entity(entity: Entity) { return new EntityProperty(entity); }
}