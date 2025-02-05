export default {
    special_item: {
        container_position: { x: -66, y: 25, z: -538 },
        awp: 0,
        blue_armor: [1, 2, 3, 4],
        red_armor: [5, 6, 7, 8]
    },
    lobby_spawn: { x: -25, y: 30, z: -550 },
    demolition: {
        timer: {
            preparation: 20,
            running: 120,
            bombPlanted: 50,
            waiting: 5,
            gameover: 5,
        },
        bomb: {
            spawn_point: { x: -128, y: 33, z: -476 },
            bomb_point: {
                A: { x: -16, y: 29, z: -502 },
                B: { x: -21, y: 32, z: -414 }
            },
            bomb_point_range: 5,
        },
        team_spawn_point: {
            blue: { x: -23, y: 26, z: -441 },
            red: { x: -133, y: 33, z: -476 }
        },
        winningScore: 5
    }
} as const