(localStorage.getItem('ui') === null) && localStorage.setItem('ui', 'light');
import { writable } from "svelte/store";
export let dark = writable(localStorage.getItem('ui'));
dark.subscribe(v => localStorage.setItem('ui', v));