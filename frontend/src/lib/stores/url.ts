import { writable } from 'svelte/store'

export const api = writable("http://localhost:5104/api/v1/")