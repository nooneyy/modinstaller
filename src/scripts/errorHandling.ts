import { writable } from "svelte/store";

export let errorArray = writable([""]);
export const handleErr = (message: string, err: string) => {
  console.error(message, err);
  errorArray.update(arr => (arr = [...arr, message.concat(" ", err)]));
};
