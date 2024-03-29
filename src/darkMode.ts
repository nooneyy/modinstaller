import { type Writable, writable } from "svelte/store";

export const dark: Writable<boolean> = writable(
  JSON.parse(localStorage.getItem("dark") ?? "false") as boolean
);
dark.subscribe(v => localStorage.setItem("dark", String(v)));
