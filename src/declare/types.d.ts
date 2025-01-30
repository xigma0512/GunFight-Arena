import { Vector3 } from "@minecraft/server";

declare type PropertyDataType = string | number | boolean | Vector3 | undefined

declare interface IProperty {
    readonly propertyId: string;
    get value(): PropertyDataType
    update(value?: PropertyDataType): void
}

declare abstract class IStateHandler {
    update(): void;
    exit(_?: any): void;
}