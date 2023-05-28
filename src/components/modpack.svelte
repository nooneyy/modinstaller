<script lang="ts">
  import modpack from "../modpack.json";
  import { errorArray } from "../utils/errorHandling";
  import { AlertTriangleIcon as Alert } from "svelte-feather-icons";
  import InstallBtn from "./installBtn.svelte";
</script>

<div
  class="bg-[url(../background.webp)] bg-cover grow flex items-center relative overflow-hidden">
  <div
    class="ml-4 outline outline-white rounded-lg p-4 backdrop-blur-md bg-gray-500 dark:bg-black bg-opacity-30 dark:bg-opacity-30 transition-colors min-w-[24rem]">
    <h1
      class="text-white text-5xl underline font-bold tracking-tight truncate-x">
      {modpack.name}
    </h1>
    <h2 class="text-stone-200 text-2xl mt-2">
      {modpack.version}, {modpack.modcount}
      {modpack.modcount === 1 ? "mod" : "mods"}
    </h2>
    <InstallBtn />
  </div>
  {#if $errorArray.length > 0}
    <div
      class="absolute bottom-0 left-0 w-full overflow-y-auto max-h-24 bg-red-500 dark:bg-red-600 text-white flex flex-col divide-y border-t-2">
      <div
        class="p-2 text-lg font-bold flex items-center justify-center space-x-1">
        <Alert size="20" />
        <p>Error</p>
      </div>
      {#each $errorArray as error, index (index)}
        <div class="px-2 py-3 select-text text-center truncate-x">
          {error}
        </div>
      {/each}
    </div>
  {/if}
</div>
