import { writable } from 'svelte/store'

export const api_url = writable("http://localhost:5104/api/v1/")
export const api_token = writable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwianRpIjoiZmRiNzVhMDItODY2ZC00ZmEwLWI3ZWYtMTcwZWIyZDcwNGJlIiwiaWF0IjoiMDUvMDEvMjAyNCAxNjozNDo1MiIsIm5hbWUiOiJQZWRyby5NYWlhIiwiVXNlcklkIjoiOCIsImVtYWlsIjoiIiwiVXNlclR5cGUiOiJVc2VyIiwiVXNlclByb2ZpbGVJZCI6IjEiLCJleHAiOjE3MDQ0Nzk2OTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTEwNCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3MyJ9.sm8Niw93vnLwHXd48BTC8D7WIoVhXjhIomKIvD8DRv0")