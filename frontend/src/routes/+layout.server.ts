import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    try {
        return { user: locals.user, lang: locals.lang}
    } catch (ex) {
        throw ex
    }
}