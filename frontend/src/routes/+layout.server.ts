import { loadLocaleAsync } from "../i18n/i18n-util.async"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    return  {
        lang: locals.lang
    }
}