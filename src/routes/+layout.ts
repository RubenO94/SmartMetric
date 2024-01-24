import type { LayoutLoad, LayoutServerLoad } from "./$types"
import  { loadLocaleAsync } from "../i18n/i18n-util.async"
import { setLocale } from "../i18n/i18n-svelte"
import { detectLocale } from "../i18n/i18n-util"

export const load: LayoutLoad = async (event) => {
    //Set language
    const locale = detectLocale(() => event.data.lang)
    await loadLocaleAsync(locale)
    setLocale(locale)

    return event.data
}