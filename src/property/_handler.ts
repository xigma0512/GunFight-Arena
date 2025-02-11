import { Entity } from "@minecraft/server";

// World Property
import PTeamScore from "./world/team_score";
import PGameMode from "./world/game_mode";
import PPosition from "./world/positions";

// Entity Property
import PTeam from "./entity/team";
import PAlive from "./entity/alive";
import PMainWeapon from "./entity/main_weapon";
import PSecondaryWeapon from "./entity/secondary_weapon";
import PTotalStat from "./entity/total_stat";
import PTempStat from "./entity/temp_stat";


interface IWorldPropertyTable { 
    team_score: PTeamScore;
    game_mode: PGameMode;
    positions: PPosition;
}

class WorldProperty {
    private _propertyTable: IWorldPropertyTable;
    constructor() {
        this._propertyTable = {
            team_score: new PTeamScore,
            game_mode: new PGameMode,
            positions: new PPosition
        };
    }
    properties = () => this._propertyTable
    get = <K extends keyof IWorldPropertyTable>(propertyId: K) => this._propertyTable[propertyId];
}


interface IEntityPropertyTable { 
    team: PTeam;
    alive: PAlive;
    main_weapon: PMainWeapon;
    secondary_weapon: PSecondaryWeapon;
    temp_stat: PTempStat;
    total_stat: PTotalStat;
}

class EntityProperty {
    private _propertyTable: IEntityPropertyTable;
    constructor(private _entity: Entity) {
        this._propertyTable = {
            team: new PTeam(this._entity),
            alive: new PAlive(this._entity),
            main_weapon: new PMainWeapon(this._entity),
            secondary_weapon: new PSecondaryWeapon(this._entity),
            temp_stat: new PTempStat(this._entity),
            total_stat: new PTotalStat(this._entity)
        }
    }
    properties = () => this._propertyTable;
    get = <K extends keyof IEntityPropertyTable>(propertyId: K) => this._propertyTable[propertyId]
}

export default abstract class Property {
    static world() { return new WorldProperty() }
    static entity(entity: Entity) { return new EntityProperty(entity); }
}