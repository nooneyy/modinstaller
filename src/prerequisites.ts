import { type } from "@tauri-apps/api/os";
import { BaseDirectory, exists } from "@tauri-apps/api/fs";
import modpack from "./modpack.json"
export const osType: string = await type()
export let versionExists: boolean = null;

await exists('.minecraft/versions/' + modpack.version, { dir: BaseDirectory.AppData })
    .then(res => versionExists = res)
    .catch(e => console.error("Unable to check minecraft versions", e))