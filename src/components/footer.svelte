<script lang="ts">
  import { dark } from "../darkMode";
  import { MoonIcon as Moon, SunIcon as Sun } from "svelte-feather-icons";
</script>

<div
  class="p-5 flex justify-center grow-0 dark:bg-zinc-800 dark:text-white transition-colors items-center space-x-3">
  <p>Copyright © {new Date().getFullYear()} modinstaller Contributors. MIT</p>
  <button
    class="mr-4 border-2 rounded-xl p-2 hover:bg-zinc-300 dark:hover:bg-zinc-900 transition-colors"
    on:click={() => dark.update(v => !v)}
    aria-label="Toggle Dark/light mode">
    <svelte:component
      this={$dark ? Sun : Moon}
      size="20"
      class="fill-current" />
  </button>
</div>
