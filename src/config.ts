export default {
    container: {
        position: { x: -66, y: 25, z: -538 },
        awp: 0,
        blue_armor: [1, 2, 3, 4],
        red_armor: [5, 6, 7, 8]
    },
    demolition: {
        timer: {
            preparation: 20,
            running: 120,
            bombPlanted: 50,
            waiting: 5,
            gameover: 5,
        },
        bomb: {
            bomb_target_range: 5,
        },
        winningScore: 5
    }
} as const