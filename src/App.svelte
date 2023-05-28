<script lang="ts">
  import Header from "./components/header.svelte";
  import ModpackInfo from "./components/modpack.svelte";
  import Footer from "./components/footer.svelte";
  import { dark } from "./darkMode";
</script>

<head />
<main
  class="flex-col flex h-screen subpixel-antialiased select-none"
  class:dark={$dark}>
  <Header />
  <ModpackInfo />
  <Footer />
</main>
