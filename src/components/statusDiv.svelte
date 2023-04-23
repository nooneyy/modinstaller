<script lang="ts">
  import Check from "../svg/check.svelte";
  import Xmark from "../svg/xmark.svelte";
  import Qmark from "../svg/qmark.svelte";
  export let condition: boolean = false;
  export let type: string = "";
  export let platform: string | undefined = undefined;
  const trueBg = "dark:bg-green-600 bg-green-500";
  const falseBg = "dark:bg-red-600 bg-red-500";
  const forgeFalseBg = "dark:bg-zinc-600 bg-zinc-500";
</script>

<div
  class="py-2 m-2 border-2 rounded-lg text-white {type === 'Minecraft'
    ? 'ml-auto px-3'
    : 'px-4'} flex items-center {condition
    ? trueBg
    : type === 'Forge'
    ? forgeFalseBg
    : falseBg}">
  <p class="mr-2">
    {platform ? `${type}: ${platform}` : `${type}: `}
  </p>
  <svelte:component
    this={condition ? Check : type === "Forge" ? Qmark : Xmark} />
</div>
