import { join } from "@tauri-apps/api/path"
import { type } from "@tauri-apps/api/os";
import { BaseDirectory, exists } from "@tauri-apps/api/fs";
import modpack from "./modpack.json"
export const osType: string = await type()
export let versionExists: boolean = null;

let path: string;
await join('.minecraft', 'versions', modpack.version)
    .then(res => path = res)
    .catch(e => console.error("Unable to create version path:", e))

await exists(path, { dir: BaseDirectory.Data })
    .then(res => versionExists = res)
    .catch(e => console.error("Unable to check minecraft version:", e))