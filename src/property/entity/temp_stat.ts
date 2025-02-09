import { IProperty, ITempStat } from "../../declare/types";

import { Entity } from "@minecraft/server";

const blank: ITempStat = {
    kills: 0,
    deaths: 0,
    planted: 0,
    defused: 0
}

export default class PTempStat implements IProperty {
    
    readonly propertyId = "temp_stat";

    constructor(private entity: Entity) {
        if (this.entity.getDynamicProperty(this.propertyId) === undefined)
            this.entity.setDynamicProperty(this.propertyId, JSON.stringify(blank));
    }
    get value() { return this.entity.getDynamicProperty(this.propertyId) as string }
    update = (value: string = JSON.stringify(blank)) => this.entity.setDynamicProperty(this.propertyId, value);

    getTempStat(options: keyof typeof blank): number {
        return (JSON.parse(this.value) as ITempStat)[options];
    }

    updateTempStat(options: keyof typeof blank, value: number) {
        const stat = JSON.parse(this.value) as ITempStat;
        stat[options] = value;
        this.update(JSON.stringify(stat));
    }
} 