import { writable } from "svelte/store";
import { join, dataDir } from "@tauri-apps/api/path";
import { type } from "@tauri-apps/api/os";
import { fetch, ResponseType } from "@tauri-apps/api/http";
import {
  BaseDirectory,
  exists,
  writeTextFile,
  writeBinaryFile,
} from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";
import { handleErr } from "./errorHandling";

export const osType: string = await type().catch(e => {
  handleErr("Failed to get OS type: ", e);
  return "";
});
export let minecraftExists = writable<boolean>(false);

const defaultMinecraftPath: string = await join(
  ".minecraft",
  "launcher_profiles.json"
);

await exists(defaultMinecraftPath, { dir: BaseDirectory.Data })
  .then(res => {
    minecraftExists.update(v => (v = res));
  })
  .catch(e => handleErr("Error checking Minecraft path:", e));

export const changeMinecraftPath = async () => {
  let path = (await open({
    defaultPath: await dataDir(),
    directory: true,
    multiple: false,
    recursive: true,
  })) as string;
  if (path) {
    path = await join(path, "launcher_profiles.json");
    await exists(path)
      .then(res => minecraftExists.set(res))
      .catch(e => handleErr("Error checking Minecraft path", e));
  }
};

const legacyPath: string = await join(
  ".minecraft",
  "assets",
  "indexes",
  "legacy.json"
);

const getLegacyJSON = async () => {
  if (!(await exists(legacyPath, { dir: BaseDirectory.Data }))) {
    await fetch(
      "https://web.archive.org/web/20140911064532/https://s3.amazonaws.com/Minecraft.Download/indexes/legacy.json",
      { method: "GET" }
    )
      .then(
        async res =>
          await writeTextFile(legacyPath, JSON.stringify(res.data, null, 2), {
            dir: BaseDirectory.Data,
          })
      )
      .catch(e => handleErr("Unable to fetch legacy.json:", e));
  }
};

const downloadForgeCLIUtil = async () => {
  await fetch(
    "https://api.github.com/repos/3arthqu4ke/ForgeCLI/releases/latest",
    { method: "GET" }
  )
    .then(async (r: any) => {
      const asset = r.data.assets.find((asset: any) =>
        asset.name.endsWith("-all.jar")
      );
      if (asset) {
        await fetch(
          "https://api.github.com/repos/3arthqu4ke/ForgeCLI/releases/assets/" +
            asset.id,
          {
            method: "GET",
            headers: { Accept: "application/octet-stream" },
            responseType: ResponseType.Binary,
          }
        ).then(
          async (r: any) =>
            await writeBinaryFile(asset.name, r.data, {
              dir: BaseDirectory.Desktop,
            })
        );
      } else {
        handleErr("No ForgeCLI asset found!");
      }
    })
    .catch(e => handleErr("Unable to fetch ForgeCLI:", e));
};
