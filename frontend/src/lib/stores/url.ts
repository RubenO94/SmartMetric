import { writable } from 'svelte/store'

export const api = writable("http://localhost:5104/api/v1/")
export const api_token = writable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MCIsImp0aSI6ImZlMjI0Y2Y1LWRlZmQtNGZlOS05MjQ1LTc0OWNiN2E2OWU0ZSIsImlhdCI6IjEyLzEyLzIwMjMgMTE6MjM6NDAiLCJuYW1lIjoiVmlhZ2VucyIsInVuaXF1ZV9uYW1lIjoiNDAiLCJlbWFpbCI6IiIsImdpdmVuX25hbWUiOiJVc2VyIiwiZmFtaWx5X25hbWUiOiI1IiwiZXhwIjoxNzAyMzg3NDIwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxMDQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMifQ.QnqIy30RuNupJuShYLm1xHc9uR4vjcQzmStCkP6GxE0")