import { writable } from 'svelte/store'

export const api_url = writable("http://localhost:5104/api/v1/")
export const api_token = writable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiYzAyZmQ3ZWQtZjUyZi00OTRiLWI2NDAtNDJhZDdlODlkMjEwIiwiaWF0IjoiMTgvMDEvMjAyNCAxNDowNToxOCIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiVXNlcklkIjoiMSIsImVtYWlsIjoiIiwiVXNlclR5cGUiOiJTbWFydFRpbWVVc2VyIiwiVXNlclByb2ZpbGVJZCI6IiIsImV4cCI6MTcwNTU5MzkxOCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTA0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIn0.5dG7nYSd4WJT3jeenY3hvSmPDP-g-kC0IstBp3bxgUQ")