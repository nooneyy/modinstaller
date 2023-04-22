<script lang="ts">
  import { osType, versionExists } from "../scripts/prerequisites";
  import Xmark from "../svg/xmark.svelte";
  import Qmark from "../svg/qmark.svelte";
  import Check from "../svg/check.svelte";
  const platform: string =
    osType === "Windows_NT" ? "Windows" : String({ osType });
  //test value for now
  const forgeExists = false;
</script>

<div
  class="flex items-center grow-0 dark:bg-zinc-800 dark:text-white transition-colors">
  <div
    class="relative py-2 px-4 m-2 border-2 rounded-lg bg-clip-text font-bold group">
    <p
      class="relative z-10 bg-gradient-to-r from-teal-400 to-blue-400 text-xl bg-clip-text text-transparent group-hover:text-white transition-colors">
      modinstaller
    </p>
    <div
      class="opacity-0 group-hover:opacity-100 transition-opacity inset-0 absolute bg-gradient-to-tr from-teal-400 to-blue-400 h-full w-full rounded-md" />
  </div>
  <div
    class="py-2 px-3 m-2 border-2 rounded-lg ml-auto flex items-center {versionExists
      ? 'dark:bg-green-600 bg-green-500'
      : 'dark:bg-red-600 bg-red-500'}">
    <p class="mr-2">Minecraft:</p>
    <svelte:component this={versionExists ? Check : Xmark} />
  </div>
  <div
    class="py-2 px-4 m-2 border-2 rounded-lg flex items-center {platform ===
    'Windows'
      ? 'dark:bg-green-600 bg-green-500'
      : 'dark:bg-red-600 bg-red-500'}">
    <p class="mr-2">Platform: {platform}</p>
    <svelte:component this={platform === "Windows" ? Check : Xmark} />
  </div>
  <div
    class="py-2 px-4 m-2 border-2 rounded-lg flex items-center {forgeExists
      ? 'dark:bg-green-600 bg-green-500'
      : 'dark:bg-zinc-600 bg-stone-500'}">
    <p class="mr-2">Forge:</p>
    <svelte:component this={forgeExists ? Check : Qmark} />
  </div>
</div>
