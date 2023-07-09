<script lang="ts">
  import { installForge, javaExists } from "../utils/forgeInstall";
  import { fade } from "svelte/transition";
  import Spin from "../svg/spin.svelte";
  import { minecraftPath, progress } from "../utils/prerequisites";
  let installing = false;
  const btnClasses =
    "px-5 py-2 border-2 rounded-lg transition-colors text-white font-semibold w-fit";
  const progressClasses =
    "w-full bg-gray-200 dark:bg-gray-500 rounded-xl h-2.5";
</script>

<div class="flex items-center mt-3 space-x-4">
  <button
    on:click={async () => {
      installing = true;
      await installForge();
    }}
    disabled={!$javaExists || installing || $minecraftPath === ""}
    class={`${btnClasses} ${
      !$javaExists || $minecraftPath === ""
        ? "cursor-not-allowed opacity-70 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
        : "bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 hover:dark:bg-blue-600"
    } ${installing ? "cursor-not-allowed" : ""}`}>
    {#if !$javaExists || $minecraftPath === ""}
      Can't Install: {!$javaExists
        ? "Java not found"
        : "No Minecraft install found"}
    {:else if installing}
      <div
        class="flex justify-center items-center
      ">
        <Spin class="h-5 w-5 mr-2" />
        Installing
      </div>
    {:else}
      Install
    {/if}
  </button>
  {#if installing}
    <div transition:fade={{ duration: 150 }} class={progressClasses}>
      <div
        class="rounded-full h-2.5 transition-all {$progress === 100
          ? 'bg-green-500 dark:bg-green-600'
          : 'bg-blue-500 dark:bg-blue-600'}"
        style:width={`${$progress}%`} />
    </div>
  {/if}
</div>
