import { IProperty, ITotalStat } from "../../declare/types";

import { Entity } from "@minecraft/server";

const blank: ITotalStat = {
    kills: 0,
    deaths: 0,
    planted: 0,
    defused: 0,
    wins: 0,
    losts: 0
}

export default class PTotalStat implements IProperty {
    
    readonly propertyId = "total_stat";

    constructor(private entity: Entity) {
        if (this.entity.getDynamicProperty(this.propertyId) === undefined)
            this.entity.setDynamicProperty(this.propertyId, JSON.stringify(blank));
    }
    get value() { return this.entity.getDynamicProperty(this.propertyId) as string }
    update = (value: string = JSON.stringify(blank)) => this.entity.setDynamicProperty(this.propertyId, value);

    getTempStat(options: keyof typeof blank): number {
        return (JSON.parse(this.value) as ITotalStat)[options];
    }

    updateTempStat(options: keyof typeof blank, value: number) {
        const stat = JSON.parse(this.value) as ITotalStat;
        stat[options] = value;
        this.update(JSON.stringify(stat));
    }
} 