import { api_token } from '$lib/stores/url'
import secrets from './secrets.server'

let token = ""
api_token.subscribe((value) => { token = value })

export async function api (method: string, resource: string, data?: Record<string, unknown>) {
    try {
        const base = secrets.apiUrl

        var response = await fetch(`${base}/${resource}`, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: data && JSON.stringify(data)
        })
        var responseFromApi = await response.json()

        return { 
            status: responseFromApi.statusCode,
            message: responseFromApi.message,
            body: responseFromApi.data
        }

    } catch (error) {
        console.log(error)
    }
}