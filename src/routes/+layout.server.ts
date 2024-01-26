import { api } from "$lib/api/_api"
import { error } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    try {
        const [user] = await Promise.all([ api("GET", "Users/me") ])
        if (!user || user.body == null) {
            throw error(404, { message: 'Not Found'})
        }
        locals.user = user?.body
        return { user: locals.user, lang: locals.lang }
    } catch (ex) {
        throw ex
    }
}