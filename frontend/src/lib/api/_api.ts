import { api_token, api_url } from '$lib/stores/url'

let token = ""
api_token.subscribe((value) => { token = value })

let urlToApi = ""
api_url.subscribe((value) => { urlToApi = value })

export async function api (method: string, resource: string, data?: Record<string, unknown>) {
    try {
        var response = await fetch(urlToApi + resource, {
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
            body: responseFromApi.data,
            total: responseFromApi.totalCount,
            error: responseFromApi.error,
            details: responseFromApi.details
        }

    } catch (error) {
        console.log(error)
    }
}