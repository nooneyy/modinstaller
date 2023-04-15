import { writable } from "svelte/store";

export let dark = writable(localStorage.getItem('ui') ?? 'light');
dark.subscribe((v => localStorage.setItem('ui', v)));