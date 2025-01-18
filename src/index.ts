
import events from "./event/_handler";
import { run } from "./system/run";
for (const ev of events) { ev.subscribe(); }
run()