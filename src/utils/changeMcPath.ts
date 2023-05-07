import { exists } from "@tauri-apps/api/fs";
import { dataDir, join } from "@tauri-apps/api/path";
import { handleErr } from "./errorHandling";
import { minecraftPath, checkForgeExists } from "./prerequisites";
import { open } from "@tauri-apps/api/dialog";

export const changeMinecraftPath = async () => {
  let path = (await open({
    defaultPath: await dataDir(),
    directory: true,
    multiple: false,
    recursive: true,
  })) as string;
  if (path) {
    const verifyPath = await join(path, "launcher_profiles.json");
    await exists(verifyPath)
      .then(res => {
        minecraftPath.update(p => (res ? (p = path) : ""));
        checkForgeExists();
      })
      .catch(e => handleErr("Error checking Minecraft path", e));
  }
};
