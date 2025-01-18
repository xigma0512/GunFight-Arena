import { world } from "@minecraft/server"

const waiting = (tickingTime: number) => {
    world.getAllPlayers().forEach(player => {
        const text = (gpNum: number) => `Waiting for more players...(${gpNum}/10)`
        const gpNum = world.getAllPlayers().length
        player.onScreenDisplay.setActionBar(text(gpNum))
    });
}
export { waiting }