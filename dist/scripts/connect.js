import { getServers } from "/scripts/util/game.js";
import { cmd } from "/scripts/util/dom.js";
/** @param {NS} ns*/
export async function main(ns) {
    const [target] = ns.args;
    if (typeof target !== "string")
        throw new Error("Invalid target.");
    const server = getServers(ns).find((s) => s.name === target);
    const command = `connect ${server.path.join("; connect ")};`;
    cmd(command);
}
