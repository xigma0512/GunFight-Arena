import { world } from "@minecraft/server"
import { Status, Team } from "../../../../declare/enums"

import { changeStatus } from "../../../../utils/changeStatus"

const preparing = (tickingTime: number) => {
    world.getAllPlayers().forEach(player => {
        const text = (time: number) => `The Game Starts in ${time} sec(s).`
        player.onScreenDisplay.setActionBar(text(tickingTime))
    })
    if (tickingTime <= 0)
        changeStatus(Status.Running, world.getAllPlayers())
}
export { preparing }