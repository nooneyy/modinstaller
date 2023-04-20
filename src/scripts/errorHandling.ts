import { writable } from "svelte/store";

export let errorArray = writable([""]);
export const handleErr = (err: string) => {
  console.error(err);
  errorArray.update(v => (v = [...v, err]));
  console.log(errorArray);
};
