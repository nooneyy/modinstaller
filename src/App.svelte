<script lang="ts">
  import { dark } from './darkMode'
  import Header from './components/header.svelte'
  import ModpackInfo from './components/modpack.svelte'
  import Footer from './components/footer.svelte'
</script>

<head>
  <script src="https://kit.fontawesome.com/0a3fea4a81.js" crossorigin="anonymous"></script>
</head>
<main class="flex-col flex h-screen subpixel-antialiased select-none" class:dark={$dark === 'dark'}>
  <Header />
  <ModpackInfo />
  <Footer/>
</main>
