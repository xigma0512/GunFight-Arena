import { EntityEquippableComponent, EquipmentSlot, HudElement, Player } from "@minecraft/server"

const hold_detect = (player: Player) => {
    const equipment = player.getComponent('equippable') as EntityEquippableComponent
    const handItem = equipment.getEquipment(EquipmentSlot.Mainhand)

    if (handItem == undefined) return

    const holdAWP = handItem?.typeId == 'gabrielaplok:awp'
    if (handItem?.typeId == "gabrielaplok:m249" || holdAWP)
        player.addEffect('slowness', 10, { amplifier: 0, showParticles: false })
    else player.removeEffect("slowness")

    player.onScreenDisplay.setHudVisibility(holdAWP ? 0 : 1, [HudElement.Crosshair])
}
export { hold_detect }