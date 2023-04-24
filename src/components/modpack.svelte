<script lang="ts">
  import modpack from "../modpack.json";
  import { errorArray } from "../scripts/errorHandling";
  import Alert from "../svg/alert.svelte";
</script>

<div
  class="bg-[url(../background.webp)] bg-cover grow flex items-center relative overflow-hidden">
  <div
    class="ml-4 outline outline-white rounded-lg p-4 backdrop-blur-md bg-gray-500 dark:bg-black bg-opacity-30 dark:bg-opacity-30 transition-all">
    <h1 class="text-white text-5xl underline font-bold tracking-tight">
      {modpack.name}
    </h1>
    <h2 class="text-stone-200 text-2xl mt-2">
      {modpack.version}, {modpack.modcount}
      {modpack.modcount === 1 ? "mod" : "mods"}
    </h2>
    <button
      on:click={() => console.log("Hi")}
      class="mt-3 px-5 py-2 border-2 rounded-lg bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 transition-colors text-white"
      >Install</button>
  </div>
  {#if $errorArray.length > 0}
    <div
      class="absolute bottom-0 left-0 w-full overflow-y-auto max-h-24 bg-red-500 dark:bg-red-600 text-white flex flex-col divide-y border-t-2">
      <div
        class="p-2 text-lg font-bold flex items-center justify-center space-x-1">
        <Alert />
        <p>
          {$errorArray.length > 1
            ? `${$errorArray.length} Errors occurred:`
            : `${$errorArray.length} Error occurred:`}
        </p>
      </div>
      {#each $errorArray as error, index (index)}
        <div class="px-2 py-3 select-text text-center truncate-x">
          {error}
        </div>
      {/each}
    </div>
  {/if}
</div>
