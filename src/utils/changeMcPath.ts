import { exists } from "@tauri-apps/api/fs";
import { dataDir, join } from "@tauri-apps/api/path";
import { handleErr } from "./errorHandling";
import { minecraftPath, checkForgeExists } from "./prerequisites";
import { open } from "@tauri-apps/api/dialog";

export const changeMcPath = async (path: string) => {
  const verifyPath = await join(path, "launcher_profiles.json");
  await exists(verifyPath)
    .then(res => {
      minecraftPath.set(res ? path : "");
      checkForgeExists();
    })
    .catch(e => handleErr("Error checking Minecraft path", e));
};

export const getMinecraftPath = async () => {
  const path = (await open({
    defaultPath: await dataDir(),
    directory: true,
    multiple: false,
    recursive: true,
  })) as string;
  if (path) {
    await changeMcPath(path);
  }
};
