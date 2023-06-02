import { writable } from "svelte/store";
import type { TopNavPage } from "./types";

export const currentPage = writable<TopNavPage>("dashboard");