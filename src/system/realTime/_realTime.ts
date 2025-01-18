import { world } from "@minecraft/server"
import { hold_detect } from "./hold_detect"
import { showInfoScreen } from "./showInfoScreen"
import { gun_choose } from "./gun_choose"

const realTime = () => {
    world.getPlayers().forEach(onlinePlayer => {
        hold_detect(onlinePlayer)
        showInfoScreen(onlinePlayer)
        gun_choose(onlinePlayer);
    })
}
export { realTime }