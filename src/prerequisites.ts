import { type } from "@tauri-apps/api/os";
import { BaseDirectory, exists } from "@tauri-apps/api/fs";
import modpack from "./modpack.json"
export const osType: string = await type()
export const versionExists = async (v: string) => await exists('.minecraft/versions/' + v, { dir: BaseDirectory.AppData }).then((res) => { return res });


console.log(versionExists(modpack.version))