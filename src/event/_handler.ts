import entityDie from "./after/entityDie";
import entityHealthChange from "./after/entityHealthChange";
import playerSpawn from "./after/playerSpawn";
import worldInit from "./after/worldInit";
import onChat from "./before/onChat";


const events = [
    entityDie,
    playerSpawn,
    worldInit,
    entityHealthChange,
    onChat
]
export default events;