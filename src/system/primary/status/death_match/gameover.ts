import { world } from "@minecraft/server"
import { Status } from "../../../../declare/enums"
import { changeStatus } from "../../../../utils/changeStatus"

const gameover = (tickingTime: number) => {
    world.getAllPlayers().forEach(p => {
        const text = (t: number) => `Back to the lobby in ${t} seconds.`
        p.onScreenDisplay.setActionBar(text(tickingTime))
    })
    if (tickingTime <= 0) changeStatus(Status.Waiting, world.getAllPlayers())
}
export { gameover }