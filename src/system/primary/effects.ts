import { world } from "@minecraft/server"

const effect = () => {
    world.getAllPlayers().forEach(player => {
        player.addEffect('saturation', 20, { amplifier: 1, showParticles: false })
    })
}
export { effect }