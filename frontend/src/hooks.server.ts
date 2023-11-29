import type { Handle } from '@sveltejs/kit'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.lang = initAcceptLanguageHeaderDetector(event.request)()

    return resolve(event)
}