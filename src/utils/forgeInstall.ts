import { handleErr } from "./errorHandling";
import {
  BaseDirectory,
  exists,
  createDir,
  removeFile,
} from "@tauri-apps/api/fs";
import { fetch } from "@tauri-apps/api/http";
import { download } from "tauri-plugin-upload-api";
import { Command } from "@tauri-apps/api/shell";
import modpack from "../modpack.json";
import { writable, type Writable, get } from "svelte/store";
import { checkForgeExists, minecraftPath } from "./prerequisites";
import { dataDir, join } from "@tauri-apps/api/path";
import { tempdir } from "@tauri-apps/api/os";
import { progress, forgeExists } from "./prerequisites";

interface Asset {
  name: string;
  id: number;
}

let forgeCLIName = "";
const forgeCLIURL = "https://api.github.com/repos/3arthqu4ke/ForgeCLI/releases";
const utilsFolder = "modinstaller/utils";
const forgeFile = `forge-${modpack.forge}-installer.jar`;

export const javaExists: Writable<boolean> = writable(false);
new Command("java", "-version")
  .execute()
  .then(() => javaExists.set(true))
  .catch(e => handleErr("", e));

const downloadForgeCLIUtil = async () => {
  await fetch(`${forgeCLIURL}/latest`, { method: "GET" })
    .then(async r => {
      progress.update(n => n + (1 / 12) * 100);
      const asset = (r.data as { assets: Asset[] }).assets.find(
        (asset: { name: string }) => asset.name.endsWith("-all.jar")
      );
      if (asset) {
        forgeCLIName = asset.name;
        if (
          !(await exists(`${utilsFolder}/${asset.name}`, {
            dir: BaseDirectory.Data,
          }))
        ) {
          if (!(await exists(utilsFolder, { dir: BaseDirectory.Data }))) {
            await createDir(utilsFolder, {
              dir: BaseDirectory.Data,
            });
          }
          await download(
            `${forgeCLIURL}/assets/${asset.id}`,
            await join(await dataDir(), utilsFolder, forgeCLIName),
            (downloadProgress, totalDownloadSize) => {
              progress.update(
                n => n + (downloadProgress / totalDownloadSize) * (100 / 12)
              );
            },
            {
              "User-Agent": "application/octet-stream",
              Accept: "application/octet-stream",
            }
          ).catch(e => handleErr("Failed to download ForgeCLI:", e));
        } else {
          progress.update(n => n + (1 / 6) * 100);
        }
      } else {
        handleErr("No ForgeCLI asset found!");
      }
    })
    .catch(e => handleErr("Unable to fetch ForgeCLI:", e));
};

const downloadForgeJar = async () => {
  await download(
    `https://maven.minecraftforge.net/net/minecraftforge/forge/${modpack.forge}/${forgeFile}`,
    await join(await tempdir(), forgeFile),
    (downloadProgress, totalDownloadSize) => {
      progress.update(
        n => n + (downloadProgress / totalDownloadSize) * (100 / 6)
      );
    }
  ).catch(e => handleErr("Failed to download Forge installer jar:", e));
};

export const installForge = async () => {
  if (!get(forgeExists)) {
    await downloadForgeCLIUtil();
    await downloadForgeJar();
    const installCmd = new Command("java", [
      "-jar",
      await join(await dataDir(), "modinstaller", "utils", forgeCLIName),
      "--installer",
      await join(await tempdir(), forgeFile),
      "--target",
      get(minecraftPath),
    ]);
    installCmd.stdout.on("data", v => console.log(`${v}\n`));
    await installCmd
      .execute()
      .then(async r => {
        if (r.code == 0) {
          progress.update(n => Math.round(n + (1 / 6) * 100));
          await removeFile(forgeFile, { dir: BaseDirectory.Temp }).catch(e =>
            handleErr("Failed to delete Forge installer jar after install!", e)
          );
          console.log("Successfully installed Forge!");
        } else handleErr("Error installing Forge: ", r.stderr);
      })
      .catch(e => handleErr("Error installing Forge:", e));
    await checkForgeExists();
  } else progress.set(50);
};
