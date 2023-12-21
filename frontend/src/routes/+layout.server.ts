import { api } from "$lib/api/_api"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    try {
        const [requestUser] = await Promise.all([
            api('GET', `Users/me`)
        ])
        let user = requestUser?.body
        return { user, lang: locals.lang}
    } catch (ex) {
        throw ex
    }
}