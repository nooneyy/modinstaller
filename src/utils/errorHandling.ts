import { writable } from "svelte/store";

export const errorArray = writable<string[]>([]);
export const handleErr = (message: string, err?: string) => {
  const errString = `[${new Date().toLocaleTimeString()}] ${message}${
    err ? ` ${err}` : ""
  }`;

  console.error(errString);
  errorArray.update(arr => (arr = [...arr, errString]));
};
