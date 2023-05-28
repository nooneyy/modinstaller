import { writable, get } from "svelte/store";
import { join, dataDir } from "@tauri-apps/api/path";
import { type } from "@tauri-apps/api/os";
import { fetch } from "@tauri-apps/api/http";
import {
  BaseDirectory,
  exists,
  writeTextFile,
  createDir,
} from "@tauri-apps/api/fs";
import { handleErr } from "./errorHandling";
import { changeMcPath } from "./changeMcPath";
import modpack from "../modpack.json";

export const progress = writable<number>(0);
export const forgeExists = writable<boolean>(false);
export const minecraftPath = writable<string>("");
export const osType: string = await type().catch(e => {
  handleErr("Failed to get OS type: ", e);
  return "";
});

const defaultMinecraftPath: string = await join(await dataDir(), ".minecraft");

if (!(await exists("modinstaller", { dir: BaseDirectory.Data }))) {
  await createDir("modinstaller", { dir: BaseDirectory.Data });
}

export const checkForgeExists = async () => {
  if (get(minecraftPath) !== "") {
    await exists(
      `${get(minecraftPath)}/versions/${`${modpack.forge.split("-")[0]}-forge${
        modpack.forge
      }`}`
    )
      .then(v => forgeExists.set(v))
      .catch(e => handleErr("Failed to check Forge:", e));
  } else forgeExists.update(() => false);
};

await changeMcPath(defaultMinecraftPath);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getLegacyJSON = async () => {
  const legacyPath: string = await join(
    get(minecraftPath),
    "assets",
    "indexes",
    "legacy.json"
  );
  if (!(await exists(legacyPath))) {
    await fetch(
      "https://web.archive.org/web/20140911064532/https://s3.amazonaws.com/Minecraft.Download/indexes/legacy.json",
      { method: "GET" }
    )
      .then(
        async res =>
          await writeTextFile(legacyPath, JSON.stringify(res.data, null, 2), {})
      )
      .catch(e => handleErr("Unable to fetch legacy.json:", e));
  }
};
