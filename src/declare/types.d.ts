import { Vector3 } from "@minecraft/server";

declare type PropertyDataType = string | number | boolean | Vector3 | undefined

declare type Result = [boolean, string]

declare interface IProperty {
    readonly propertyId: string;
    get value(): PropertyDataType
    update(value?: PropertyDataType): void
}

declare interface IState {
    readonly STATE_ID: number;
    entry(): void;
    update(): void;
    exit(_?: any): void;
}

declare interface ITeamScore {
    red: number;
    blue: number;
}

declare interface ITempStat {
    kills: number;
    deaths: number;

    planted: number;
    defused: number;
}

declare interface ITotalStat {
    kills: number;
    deaths: number;

    planted: number;
    defused: number;
    
    wins: number;
    losts: number;
}