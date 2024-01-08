import { api } from '$lib/api/_api'
import type { Handle } from '@sveltejs/kit'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'

export const handle: Handle = async ({ event, resolve }) => {
    // Set Langs available
    event.locals.lang = initAcceptLanguageHeaderDetector(event.request)()

    // Get token from smartTime and call api to get the other token
    // ***

    // Set user logged
    const [user] = await Promise.all([ api("GET", "Users/me") ])
    event.locals.user = user?.body

    return resolve(event)
}