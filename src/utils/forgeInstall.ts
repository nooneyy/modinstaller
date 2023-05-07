import { handleErr } from "./errorHandling";
import {
  writeBinaryFile,
  BaseDirectory,
  exists,
  createDir,
} from "@tauri-apps/api/fs";
import { fetch, ResponseType } from "@tauri-apps/api/http";
import { Command } from "@tauri-apps/api/shell";
import modpack from "../modpack.json";
import { writable, type Writable, get } from "svelte/store";
import { minecraftPath } from "./prerequisites";
import { dataDir, join } from "@tauri-apps/api/path";
import { tempdir } from "@tauri-apps/api/os";

export let javaExists: Writable<boolean> = writable(false);
new Command("java", "-version")
  .execute()
  .then(() => javaExists.set(true))
  .catch(e => console.log(e));

let forgeCLIName: string = "";

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
        forgeCLIName = asset.name;
        if (
          !(await exists(`modinstaller/utils/${asset.name}`, {
            dir: BaseDirectory.Data,
          }))
        ) {
          await fetch(
            "https://api.github.com/repos/3arthqu4ke/ForgeCLI/releases/assets/" +
              asset.id,
            {
              method: "GET",
              headers: { Accept: "application/octet-stream" },
              responseType: ResponseType.Binary,
            }
          ).then(async (r: any) => {
            if (
              !(await exists("modinstaller/utils", { dir: BaseDirectory.Data }))
            ) {
              await createDir("modinstaller/utils", {
                dir: BaseDirectory.Data,
              });
            }
            await writeBinaryFile(`modinstaller/utils/${asset.name}`, r.data, {
              dir: BaseDirectory.Data,
            });
          });
        }
      } else {
        handleErr("No ForgeCLI asset found!");
      }
    })
    .catch(e => handleErr("Unable to fetch ForgeCLI:", e));
};

const downloadForgeJar = async () => {
  if (
    !(await exists(`forge-${modpack.forge}-installer.jar`, {
      dir: BaseDirectory.Temp,
    }))
  ) {
    await fetch(
      `https://maven.minecraftforge.net/net/minecraftforge/forge/${modpack.forge}/forge-${modpack.forge}-installer.jar`,
      {
        method: "GET",
        responseType: ResponseType.Binary,
      }
    )
      .then(async (r: any) => {
        await writeBinaryFile(`forge-${modpack.forge}-installer.jar`, r.data, {
          dir: BaseDirectory.Temp,
        });
      })
      .catch(e => handleErr("Failed to download Forge installer jar:", e));
  }
};

export const installForge = async () => {
  await downloadForgeCLIUtil();
  await downloadForgeJar();
  const installCmd = new Command("java", [
    "-jar",
    await join(await dataDir(), "modinstaller", "utils", forgeCLIName),
    "--installer",
    await join(await tempdir(), `forge-${modpack.forge}-installer.jar`),
    "--target",
    get(minecraftPath),
  ]);
  installCmd.stdout.on("data", v => console.log(`${v}\n`));
  await installCmd
    .execute()
    .then(() => console.log("Successfully installed Forge!"))
    .catch(e => handleErr("Error installing Forge:", e));
};
