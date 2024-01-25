import { api, getToken } from '$lib/api/_api'
import { api_token } from '$lib/stores/url'
import { error, type Handle } from '@sveltejs/kit'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'

export const handle: Handle = async ({ event, resolve }) => {
    // Set Langs available
    event.locals.lang = initAcceptLanguageHeaderDetector(event.request)()

    // Get token from smartTime and call api to get the other token
    // const name = 'Administrador'
    // const [responseToken] = await Promise.all([getToken("GET", `Accounts/Dev/AuthToken?userName=${name}`)])
    // const [responseUserToken] = await Promise.all([getToken("GET", `Accounts?token=${responseToken?.responseFromApi}`)])
    // api_token.set(responseUserToken?.responseFromApi.data.token)

    // Set user logged
    const [user] = await Promise.all([ api("GET", "Users/me") ])
    if (!user || user.body == null) {
        throw error(404, { message: 'Not Found'})
    }
    event.locals.user = user?.body

    return resolve(event)
}