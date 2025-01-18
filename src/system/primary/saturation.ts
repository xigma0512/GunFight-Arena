import { world } from "@minecraft/server"

const saturation = () => {
    world.getAllPlayers().forEach(player => {
        player.addEffect('saturation', 20, { amplifier: 1, showParticles: false })
    })
}
export { saturation }