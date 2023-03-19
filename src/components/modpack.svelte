<script lang="ts">
    import modpack from "../modpack.json"
</script>

<div class="bg-[url(image.webp)] bg-cover grow flex items-center">
    <div class="ml-4">
        <h1 class="text-white text-5xl underline font-bold tracking-tight">{modpack.name}</h1>
        <h2 class="text-stone-200 text-2xl mt-2">{modpack.version}, {modpack.modcount} {(modpack.modcount === 1 ) ? "mod" : "mods"}</h2>
        <button on:click={ ()=> console.log("Hi")} class="mt-3 px-5 py-2 rounded-lg bg-red-500 hover:bg-lime-500 transition-colors text-white">Install</button>
    </div>
    
</div>