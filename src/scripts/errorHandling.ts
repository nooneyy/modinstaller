import { writable } from "svelte/store";

export let errorArray = writable([""]);
export const handleErr = (message: string, err?: string) => {
  const errString: string = `[${new Date().toLocaleTimeString()}] ${message}${
    err ? ` ${err}` : ""
  }`;

  console.error(errString);
  errorArray.update(arr => (arr = [...arr, errString]));
};
