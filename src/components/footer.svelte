<script lang="ts">
  import { dark } from "../darkMode";
  import Moon from "../svg/moon.svelte";
  import Sun from "../svg/sun.svelte";
</script>

<div
  class="p-5 flex justify-center grow-0 dark:bg-zinc-800 dark:text-white transition-colors items-center space-x-3">
  <p>Copyright © {new Date().getFullYear()} modinstaller Contributors. MIT</p>
  <button
    class="mr-4 border-2 rounded-xl p-2"
    on:click={() => ($dark === "dark" ? dark.set("light") : dark.set("dark"))}>
    <svelte:component this={$dark === "dark" ? Moon : Sun} />
  </button>
</div>
