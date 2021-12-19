import { Cheat } from "/scripts/util.js";
const getGithubApiUrl = (path) => `https://api.github.com/repos/redmega/bitburner-scripts/contents/${path}`;
/** @param {string} path*/
async function fetchFiles(path) {
    const response = await Cheat.win.fetch(getGithubApiUrl(path));
    let body = await response.json();
    for (const item of body) {
        if (item.type === "dir") {
            body.push(...(await fetchFiles(item.path)));
        }
    }
    return body.filter((item) => item.type === "file");
}
/** @param {NS} ns*/
export async function main(ns) {
    const files = await fetchFiles("dist/scripts");
    for (const file of files) {
        ns.tprintf("INFO Downloading %s", file.path);
        await ns.wget(file.download_url, file.path.replace("dist", ""));
    }
    ns.tprintf("SUCCESS Downloaded %d files", files.length);
}
