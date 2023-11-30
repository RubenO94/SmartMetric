import secrets from './secrets.server'

export async function api (method: string, resource: string, data?: Record<string, unknown>) {
    try {
        const base = secrets.apiUrl

        var response = await fetch(`${base}/${resource}`, {
            method: method,
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