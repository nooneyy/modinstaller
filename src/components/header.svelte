<script lang="ts">
  import { osType, versionExists } from "../scripts/prerequisites";
  import StatusDiv from "./statusDiv.svelte";
  const platform: string = osType === "Windows_NT" ? "Windows" : osType;
  //test value for now
  const forgeExists = false;
  interface Component {
    type: string;
    condition: boolean;
    platform?: string;
  }
  const componentsData: Component[] = [
    { type: "Minecraft", condition: versionExists },
    { type: "Platform", condition: platform === "Windows", platform },
    { type: "Forge", condition: forgeExists },
  ];
</script>

<div
  class="flex items-center grow-0 dark:bg-zinc-800 dark:text-white transition-colors">
  <div
    class="relative py-2 px-4 m-2 border-2 rounded-lg bg-clip-text font-bold group">
    <p
      class="relative z-10 bg-gradient-to-t from-teal-400 to-blue-400 text-xl bg-clip-text text-transparent group-hover:text-white transition-colors">
      modinstaller
    </p>
    <div
      class="opacity-0 group-hover:opacity-100 transition-opacity inset-0 absolute bg-gradient-to-r from-teal-400 to-blue-400 h-full w-full rounded-md" />
  </div>
  {#each componentsData as c (c.type)}
    <StatusDiv {...c} />
  {/each}
</div>
