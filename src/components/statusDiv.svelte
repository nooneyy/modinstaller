<script lang="ts">
  import Check from "../svg/check.svelte";
  import Xmark from "../svg/xmark.svelte";
  import Qmark from "../svg/qmark.svelte";

  import { osType, minecraftPath } from "../utils/prerequisites";
  import { changeMinecraftPath } from "../utils/changeMcPath";

  const platform: string = osType === "Windows_NT" ? "Windows" : osType;
  const forgeExists: boolean = false;

  interface Component {
    type: string;
    condition?: boolean;
    platform?: string;
    hoverText?: string;
  }

  const componentsData: Component[] = [
    { type: "Minecraft", hoverText: "Change Path" },
    { type: "Platform", condition: platform === "Windows", platform },
    { type: "Forge", condition: forgeExists },
  ];

  const background = {
    true: "dark:bg-green-600 bg-green-500",
    false: "dark:bg-red-600 bg-red-500",
    forgeFalse: "dark:bg-zinc-600 bg-zinc-500",
  };
</script>

{#each componentsData as c (c.type)}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="relative group py-2 m-2 border-2 rounded-lg text-white flex items-center {c.type ===
    'Minecraft'
      ? 'ml-auto px-3'
      : 'px-4'} {(c.type === 'Minecraft' ? $minecraftPath !== '' : c.condition)
      ? background.true
      : c.type === 'Forge'
      ? background.forgeFalse
      : background.false}"
    on:click={c.type === "Minecraft" ? changeMinecraftPath : undefined}>
    <p class="mr-2">
      {c.platform ? `${c.type}: ${platform}` : `${c.type}: `}
    </p>
    <svelte:component
      this={(c.type === "Minecraft" ? $minecraftPath !== "" : c.condition)
        ? Check
        : c.type === "Forge"
        ? Qmark
        : Xmark} />
    {#if c.hoverText}
      <button
        class="bg-opacity-0 group-hover:bg-opacity-60 transition-colors inset-0 absolute bg-black h-full w-full rounded-md">
        <p class="opacity-0 group-hover:opacity-100 transition-opacity text-sm">
          {c.hoverText}
        </p>
      </button>
    {/if}
  </div>
{/each}
