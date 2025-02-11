export namespace States {

    export enum Demolition {
        Idle,
        Preparation,
        Running,
        BombPlanted,
        Waiting,
        GameOver,
    }

    export enum DeathMatch {

    }
}

export enum Mode {
    Demolition, // 爆破模式
    DeathMatch,
}

export enum Team {
    None,
    Red,
    Blue,
    Spectator,
}