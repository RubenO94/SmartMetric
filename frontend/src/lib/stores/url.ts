import { writable } from 'svelte/store'

export const api_url = writable("http://localhost:5104/api/v1/")
export const api_token = writable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MCIsImp0aSI6IjhkYTY4ODc1LTMyMWEtNGE3ZC1iMjcxLWIwZTZhOTUwYjM3NSIsImlhdCI6IjE5LzEyLzIwMjMgMTE6NDc6MzAiLCJuYW1lIjoiVmlhZ2VucyIsInVuaXF1ZV9uYW1lIjoiNDAiLCJlbWFpbCI6IiIsImdpdmVuX25hbWUiOiJVc2VyIiwiZmFtaWx5X25hbWUiOiI1IiwiZXhwIjoxNzAyOTkzNjUwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxMDQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMifQ._3tC-gmqSN6DkGUNKyuA_g5i7kNlYT12DwEh33Cf9Po")