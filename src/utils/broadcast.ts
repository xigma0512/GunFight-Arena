import { world } from "@minecraft/server";

export abstract class BroadcastUtils {
    static message(msg: string, type: 'message' | 'actionbar') {
        for (const player of world.getAllPlayers()) {
            switch (type) {
                case 'message': player.sendMessage(msg); break;
                case 'actionbar': player.onScreenDisplay.setActionBar(msg); break;
            }
        }
    }

    static sound(soundId: string) {
        for (const player of world.getAllPlayers()) {
            player.playSound(soundId);
        }
    }
}