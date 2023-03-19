<script lang="ts">
    import { osType } from "../prerequisites";
    const platform:string = (osType === "Windows_NT") ? "Windows" : String({osType});
</script>

<div class="flex grow-0 dark:bg-zinc-800 dark:text-white transition-colors">
    <div class="relative py-2 px-4 m-2 border-2 rounded-lg  bg-clip-text font-bold group">
        <p class="relative z-10 bg-gradient-to-tr from-cyan-400 to-lime-400 text-xl bg-clip-text text-transparent group-hover:text-white transition-colors">modinstaller</p>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity inset-0 absolute bg-gradient-to-tr from-cyan-400 to-lime-400 h-full w-full rounded-md"></div>
    </div>
    <div class="py-2 px-3 m-2 border-2 rounded-lg ml-auto flex items-center">
        <p class="mr-2">Minecraft:</p>
        <i class="fa-solid fa-check"></i> 
    </div>
    <div class="py-2 px-4 m-2 border-2 rounded-lg flex items-center {(platform === "Windows") ? "dark:bg-green-600 bg-green-400" : "dark:bg-red-600 bg-red-400"}">
        <p class="mr-2">Platform: {platform}</p>
        <i class="fa-solid {(platform === "Windows") ? "fa-check" : "fa-xmark"}"></i>
    </div>
    <div class="py-2 px-4 m-2 border-2 rounded-lg flex items-center">
        <p class="mr-2">Forge:</p>
        <i class="fa-solid fa-circle-question"></i>
    </div>
</div>