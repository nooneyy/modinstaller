<script lang="ts">
  import StatusDiv from "./statusDiv.svelte";
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
  <StatusDiv />
</div>
