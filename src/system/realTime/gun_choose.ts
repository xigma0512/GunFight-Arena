import { Player, world } from "@minecraft/server"
import { PropertyManager } from "../../property/_manager"

const gun_choose = (player: Player) => {
    const [main_weapon, pistol] = [
        world.scoreboard.getObjective('main_weapon'),
        world.scoreboard.getObjective('pistol')
    ]
    PropertyManager.entity(player).get('main_weapon').update(main_weapon?.getScore(player))
    PropertyManager.entity(player).get('pistol').update(pistol?.getScore(player))
}
export { gun_choose }