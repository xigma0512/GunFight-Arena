import { EntityHurtAfterEvent, world } from "@minecraft/server"

export default abstract class entityHurt {
    static subscribe = () => {
        return world.afterEvents.entityHurt.subscribe(ev => {
            ev.hurtEntity.clearVelocity();
            ev.hurtEntity.applyKnockback(0, 0, 0, 0);
        })
    }
    static unsubscribe = (ev: (args: EntityHurtAfterEvent) => void) => world.afterEvents.entityHurt.unsubscribe(ev)
}