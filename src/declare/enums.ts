export namespace States {
    export enum Demolition {
        Waiting,
        Preparing,
        Running,
        GameOver,
        Sleeping
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