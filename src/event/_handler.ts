import entityHealthChange from "./after/entityHealthChange";
import playerSpawn from "./after/playerSpawn";
import worldInit from "./after/worldInit";
import onChat from "./before/onChat";

export default function eventListener() {
    [
        playerSpawn,
        worldInit,
        entityHealthChange,
        onChat
    ].forEach(ev => ev.subscribe())
}