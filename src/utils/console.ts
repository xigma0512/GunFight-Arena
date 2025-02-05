import { world } from "@minecraft/server";

export abstract class ConsoleUtils {
    static message = (text: string) => this.send(`§f${text}§r`);
    static success = (text: string) => this.send(`§a${text}§r`);
    static error = (text: string) => this.send(`§c${text}§r`);
    static warn = (text: string) => this.send(`§e${text}§r`);

    private static send = (message: string) =>
        world.getAllPlayers().filter(pl => pl.hasTag("admin")).forEach(pl => pl.sendMessage(message));
}