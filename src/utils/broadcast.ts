import { MolangVariableMap, PlayerSoundOptions, Vector3, world } from "@minecraft/server";

export abstract class BroadcastUtils {
    static message(msg: string, type: 'message' | 'actionbar') {
        for (const player of world.getAllPlayers()) {
            switch (type) {
                case 'message': player.sendMessage(msg); break;
                case 'actionbar': player.onScreenDisplay.setActionBar(msg); break;
            }
        }
    }

    static sound(soundId: string, option?: PlayerSoundOptions) {
        for (const player of world.getAllPlayers()) {
            player.playSound(soundId, option);
        }
    }

    static particle(particleId: string, location: Vector3, options?: MolangVariableMap) {
        world.getDimension('overworld').spawnParticle(particleId, location, options);
    }
}