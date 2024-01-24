import { api_token } from '$lib/stores/url'

let token = ""
api_token.subscribe((value) => { token = value })

export async function api (method: string, resource: string, data?: any) {
    try {
        var response = await fetch("http://localhost:5104/api/v1/" + resource, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: data && JSON.stringify(data)
        })
        var responseFromApi = await response.json()

        return { 
            status: responseFromApi.statusCode,
            message: responseFromApi.message,
            body: responseFromApi.data,
            total: responseFromApi.totalCount,
            error: responseFromApi.error,
            details: responseFromApi.details
        }

    } catch (error) {
        console.log(error)
    }
}