<script lang="ts">
  import {
    XIcon as XMark,
    CheckIcon as Check,
    HelpCircleIcon as QMark,
  } from "svelte-feather-icons";
  import { osType, minecraftPath, forgeExists } from "../utils/prerequisites";
  import { getMinecraftPath } from "../utils/changeMcPath";

  const platform: string =
    osType === "Windows_NT"
      ? "Windows"
      : osType === "Darwin"
      ? "MacOS"
      : osType;

  let componentsData: {
    type: string;
    hoverText?: string;
    onClick?: () => Promise<void>;
    condition?: boolean;
    platform?: string;
  }[] = [
    {
      type: "Minecraft",
      hoverText: "Change Path",
      onClick: getMinecraftPath,
    },
    { type: "Platform", condition: platform === "Windows", platform },
    { type: "Forge" },
  ];

  // Store injection into array to keep reactivity
  $: {
    componentsData[0].condition = $minecraftPath !== "";
    componentsData[2].condition = $forgeExists;
  }

  const background: {
    true: string;
    false: string;
    forgeFalse: string;
  } = {
    true: "dark:bg-green-600 bg-green-500",
    false: "dark:bg-red-600 bg-red-500",
    forgeFalse: "dark:bg-zinc-600 bg-zinc-500",
  };

  const divClass = (component: {
    type: string;
    condition?: boolean;
  }): string => {
    return `relative group py-2 m-2 border-2 rounded-lg text-white flex items-center ${
      component.type === "Minecraft" ? "ml-auto px-3" : "px-4 cursor-default"
    } ${
      component.condition
        ? background.true
        : component.type === "Forge"
        ? background.forgeFalse
        : background.false
    }`;
  };

  const divText = (c: { platform?: string; type: string }): string => {
    return c.platform ? `${c.type}: ${platform}` : `${c.type}: `;
  };
</script>

{#each componentsData as c (c.type)}
  <button class={divClass(c)} on:click={c.onClick}>
    <p class="mr-2">
      {divText(c)}
    </p>
    <svelte:component
      this={c.condition ? Check : c.type === "Forge" ? QMark : XMark}
      size="18.4"
      strokeWidth={c.type === "Forge" && !c.condition ? 2.75 : 3.5} />
    {#if c.hoverText}
      <div
        class="bg-opacity-0 group-hover:bg-opacity-60 transition-colors inset-0 absolute bg-black h-full w-full rounded-md flex items-center justify-center">
        <p class="opacity-0 group-hover:opacity-100 transition-opacity text-sm">
          {c.hoverText}
        </p>
      </div>
    {/if}
  </button>
{/each}
