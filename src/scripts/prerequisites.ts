import { join } from "@tauri-apps/api/path";
import { type } from "@tauri-apps/api/os";
import { fetch, ResponseType } from "@tauri-apps/api/http";
import {
  BaseDirectory,
  exists,
  writeTextFile,
  writeBinaryFile,
} from "@tauri-apps/api/fs";
import { handleErr } from "./errorHandling";
import modpack from "../modpack.json";
export const osType: string = await type();
export let versionExists: boolean = false;

const versionPath: string = await join(
  ".minecraft",
  "versions",
  modpack.version
);

await exists(versionPath, { dir: BaseDirectory.Data })
  .then(res => (versionExists = res))
  .catch(e => handleErr("Unable to check minecraft version:" + e));

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
      .catch(e => handleErr("Unable to fetch asset legacy.json:" + e));
  }
};

const downloadForgeCLIUtil = async () => {
  await fetch(
    "https://api.github.com/repos/3arthqu4ke/ForgeCLI/releases/latest",
    { method: "GET" }
  ).then(async (r: any) => {
    for (const asset of r.data.assets) {
      if (asset.name.endsWith("-all.jar")) {
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
        break;
      }
    }
  });
};
